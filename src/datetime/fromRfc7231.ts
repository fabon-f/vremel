import {
	isInstantConstructor,
	isZonedDateTimeConstructor,
} from "../type-utils.js";
import type { Temporal } from "../types.js";
import { formatExactTimeIso } from "./_formatExactTimeIso.js";
import { getDayOfWeekFromYmd } from "./_getDayOfWeekFromYmd.js";
import { getDayOfWeekNumberFromAbbreviation } from "./_getDayOfWeekNumberFromAbbreviation.js";
import { getMonthNumberFromAbbreviation } from "./_getMonthNumberFromAbbreviation.js";

const regex =
	/^([A-Za-z]{3}), (\d\d) ([A-Za-z]{3}) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;

function parse(date: string) {
	const result = regex.exec(date);
	if (result === null) {
		throw new Error("Invalid format");
	}
	const [, dayOfWeek, day, monthName, year, hour, minute, second] = result;
	if (
		dayOfWeek === undefined ||
		day === undefined ||
		monthName === undefined ||
		year === undefined ||
		hour === undefined ||
		minute === undefined ||
		second === undefined
	) {
		throw new Error("something wrong");
	}
	const y = parseInt(year);
	const m = getMonthNumberFromAbbreviation(monthName);
	const d = parseInt(day);
	const weekNum = getDayOfWeekNumberFromAbbreviation(dayOfWeek);
	if (getDayOfWeekFromYmd(y, m, d) !== weekNum) {
		throw new Error(`Wrong day of week: ${dayOfWeek}`);
	}
	return [y, m, d, parseInt(hour), parseInt(minute), parseInt(second)] as const;
}

/**
 * Creates Temporal object from datetime string in RFC 7231's format (HTTP date format)
 * such as `Mon, 01 Jan 2024 01:23:45 GMT`.
 * This function doesn't support obsoleted formats.
 *
 * @param date datetime string in RFC 7231's format
 * @param TemporalClass Temporal class (such as `Temporal.PlainDateTime` or `Temporal.Instant`) which will be returned
 * @returns an instance of Temporal class specified in `TemporalClass` argument
 */
export function fromRfc7231<
	TemporalClassType extends
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDateTime,
>(
	date: string,
	TemporalClass: TemporalClassType,
): InstanceType<TemporalClassType> {
	const result = parse(date);
	const [year, month, day, hour, minute, second] = result;
	if (isInstantConstructor(TemporalClass)) {
		return TemporalClass.from(
			formatExactTimeIso(year, month, day, hour, minute, second, 0, "Z"),
		) as InstanceType<TemporalClassType>;
	}
	if (isZonedDateTimeConstructor(TemporalClass)) {
		return TemporalClass.from({
			year,
			month,
			day,
			hour,
			minute,
			second,
			calendarId: "iso8601",
			timeZone: "UTC",
		}) as InstanceType<TemporalClassType>;
	}
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
