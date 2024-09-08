import {
	isInstantConstructor,
	isPlainDateTimeConstructor,
} from "../type-utils.js";
import type { Temporal } from "../types.js";
import { formatExactTimeIso } from "./_formatExactTimeIso.js";
import { getDayOfWeekFromYmd } from "./_getDayOfWeekFromYmd.js";
import { getDayOfWeekNumberFromAbbreviation } from "./_getDayOfWeekNumberFromAbbreviation.js";
import { getMonthNumberFromAbbreviation } from "./_getMonthNumberFromAbbreviation.js";

// spec: https://datatracker.ietf.org/doc/html/rfc2822#section-3.3 https://datatracker.ietf.org/doc/html/rfc2822#section-4.3

function removeComment(str: string) {
	const r = /(?<!\\)[()]/g;
	let res = "";
	let commentNestLevel = 0;
	let lastNonCommentStarted = 0;
	for (const m of str.matchAll(r)) {
		if (m[0] === "(") {
			if (commentNestLevel === 0) {
				// comment started
				res += str.slice(lastNonCommentStarted, m.index);
			}
			commentNestLevel++;
		} else {
			commentNestLevel--;
			if (commentNestLevel === 0) {
				// comment ended
				lastNonCommentStarted = m.index + 1;
			}
			if (commentNestLevel < 0) {
				throw new Error("Unbalanced nested comment");
			}
		}
	}
	if (commentNestLevel !== 0) {
		throw new Error("Unbalanced nested comment");
	}
	return res;
}

const dateTimeFormatRegex =
	/^[ \t\r\n]*(?:([A-Za-z]{3}),)?[ \t\r\n]*(\d\d)[ \t\r\n]+([A-Za-z]{3})[ \t\r\n]+(\d\d|\d\d\d\d)[ \t\r\n]+(\d\d):(\d\d)(?::(\d\d))?[ \t\r\n]+([+-]\d{4}|[A-Za-z]+)[ \t\r\n]*$/;

function fullYear(year: string) {
	const yearNum = parseInt(year, 10);
	if (year.length === 4) {
		return yearNum;
	}
	return yearNum >= 50 ? 1900 + yearNum : 2000 + yearNum;
}

function getOffset(timeZone: string): string {
	if (["UT", "GMT", "z", "Z"].includes(timeZone)) {
		return "+00:00";
	}
	if (timeZone === "-0000" || /^[A-IK-Za-ik-z]$/.test(timeZone)) {
		// according to the spec, military zone except 'Z' should be considered equivalent to "-0000",
		// which means the date-time contains no information about the local time zone
		throw new Error("No offset info");
	}
	if (/^[+-]\d{4}$/.test(timeZone)) {
		return `${timeZone.slice(0, 3)}:${timeZone.slice(3)}`;
	}
	const table = Object.assign(Object.create(null) as Record<string, string>, {
		EDT: "-04:00",
		EST: "-05:00",
		CDT: "-05:00",
		CST: "-06:00",
		MDT: "-06:00",
		MST: "-07:00",
		PDT: "-07:00",
		PST: "-08:00",
	});
	if (table[timeZone] !== undefined) {
		return table[timeZone];
	}
	throw new Error("Unknown time zone");
}

function parse(date: string) {
	const result = dateTimeFormatRegex.exec(date);
	if (result === null) {
		throw new Error(`Invalid date and time format: ${date}`);
	}
	const [
		,
		dayOfWeek,
		day,
		monthName,
		year,
		hour,
		minute,
		second = "00",
		timeZone,
	] = result;
	if (
		day === undefined ||
		monthName === undefined ||
		year === undefined ||
		hour === undefined ||
		minute === undefined ||
		timeZone === undefined
	) {
		throw new Error("something wrong");
	}
	return [
		fullYear(year),
		getMonthNumberFromAbbreviation(monthName),
		parseInt(day),
		parseInt(hour, 10),
		parseInt(minute, 10),
		parseInt(second),
		dayOfWeek,
		timeZone,
	] as const;
}

/**
 * Creates Temporal object from datetime string in RFC 2822's format.
 *
 * @param date datetime string in RFC 2822's format
 * @param TemporalClass Temporal class (such as `Temporal.PlainDateTime` or `Temporal.Instant`) which will be returned
 * @returns an instance of Temporal class specified in `TemporalClass` argument
 */
export function fromRfc2822<
	TemporalClassType extends
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDateTime,
>(
	date: string,
	TemporalClass: TemporalClassType,
): InstanceType<TemporalClassType> {
	const dateWithoutComment = date.includes("(") ? removeComment(date) : date;

	const [year, month, day, hour, minute, second, dayOfWeek, timeZone] =
		parse(dateWithoutComment);
	if (
		dayOfWeek !== undefined &&
		getDayOfWeekFromYmd(year, month, day) !==
			getDayOfWeekNumberFromAbbreviation(dayOfWeek)
	) {
		throw new Error(`Wrong day of week: ${dayOfWeek}`);
	}

	if (isPlainDateTimeConstructor(TemporalClass)) {
		return TemporalClass.from({
			year,
			month,
			day,
			hour,
			minute,
			second,
			calendarId: "iso8601",
		}) as InstanceType<TemporalClassType>;
	}

	const offsetIso = getOffset(timeZone);
	if (isInstantConstructor(TemporalClass)) {
		return TemporalClass.from(
			formatExactTimeIso(year, month, day, hour, minute, second, 0, offsetIso),
		) as InstanceType<TemporalClassType>;
	}
	return TemporalClass.from({
		year,
		month,
		day,
		hour,
		minute,
		second,
		calendarId: "iso8601",
		timeZone: offsetIso,
	}) as InstanceType<TemporalClassType>;
}
