import {
	isInstantConstructor,
	isPlainDateTimeConstructor,
} from "../type-utils.js";
import type { Temporal } from "../types.js";

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
		}
	}
	return res;
}

const dateTimeFormatRegex =
	/^[ \t\r\n]*(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),)?[ \t\r\n]*(\d\d)[ \t\r\n]+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[ \t\r\n]+(\d\d|\d\d\d\d)[ \t\r\n]+(\d\d):(\d\d)(?::(\d\d))?[ \t\r\n]+([+-]\d{4}|[A-Za-z]+)[ \t\r\n]*$/;

function fullYear(year: string) {
	const yearNum = parseInt(year, 10);
	if (year.length === 4) {
		return yearNum;
	}
	return yearNum >= 50 ? 1900 + yearNum : 2000 + yearNum;
}

function getDayOfWeek(year: number, month: number, day: number) {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const week = days[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
	if (week === undefined) {
		throw new Error("something wrong");
	}
	return week;
}

function monthNumber(monthName: string) {
	const monthNum =
		[
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		].indexOf(monthName) + 1;
	if (monthNum === 0) {
		throw new Error(`Invalid month name: ${monthName}`);
	}
	return monthNum;
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
	return {
		year: fullYear(year),
		month: monthNumber(monthName),
		day: parseInt(day, 10),
		hour: parseInt(hour, 10),
		minute: parseInt(minute, 10),
		second: parseInt(second),
		dayOfWeek,
		timeZone,
	};
}

function formatInstantIso(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	offsetString: string,
) {
	const yearStr = year.toString();
	const monthStr = month.toString().padStart(2, "0");
	const dayStr = day.toString().padStart(2, "0");
	const hourStr = hour.toString().padStart(2, "0");
	const minuteStr = minute.toString().padStart(2, "0");
	const secondStr = second.toString().padStart(2, "0");
	return `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}:${secondStr}${offsetString}`;
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

	const { year, month, day, hour, minute, second, dayOfWeek, timeZone } =
		parse(dateWithoutComment);
	if (dayOfWeek !== undefined && getDayOfWeek(year, month, day) !== dayOfWeek) {
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
			formatInstantIso(year, month, day, hour, minute, second, offsetIso),
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
