import { UTCDate } from "@date-fns/utc";

import {
	isPlainDate,
	isPlainMonthDay,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { GenericDateConstructor, Temporal } from "../types.js";
import { createDateFromClockTime } from "./_createDateFromClockTime.js";

function parseIsoString(date: string) {
	const res = /^(\d{4,}|[+-]\d{6})-(\d{2})-(\d{2})/.exec(date);
	if (res === null) {
		throw new Error("Invalid format");
	}
	const [, y, m, d] = res;
	if (y === undefined || m === undefined || d === undefined) {
		throw new Error("Invalid format");
	}
	return {
		year: parseInt(y, 10),
		month: parseInt(m, 10),
		day: parseInt(d, 10),
	};
}

// function to bypass an enigmatic TypeScript error "could be instantiated with a different subtype of constraint"
function createDate<DateType extends Date>(
	DateConstructor: GenericDateConstructor<DateType> | undefined,
	year: number,
	month: number,
	day = 1,
	hour = 0,
	minute = 0,
	second = 0,
	millisecond = 0,
) {
	return DateConstructor
		? createDateFromClockTime(DateConstructor, year, month, day, hour, minute, second, millisecond)
		: createDateFromClockTime(UTCDate, year, month, day, hour, minute, second, millisecond);
}

/**
 * Returns `Date` which represents clock (local) time of given temporal object,
 * dropping timezone and calendar information.
 * When you pass `ZonedDateTime`, clock time will be unchanged but exact time will change.
 * This function is useful when you want to use formatting functions of [date-fns](https://date-fns.org/).
 *
 * @param dateTime datetime object
 */
export function toDateFromClockTime(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
): UTCDate;
/**
 * Returns `Date` which represents clock (local) time of given temporal object,
 * dropping timezone and calendar information.
 * When you pass `ZonedDateTime`, clock time will be unchanged but exact time will change.
 * This function is useful when you want to use formatting functions of [date-fns](https://date-fns.org/).
 * You can pass `DateConstructor` parameter to specify a constructor to build the date to return,
 * but passing JavaScript's `Date` is **strongly discouraged** because `Date` is a hotbed of timezone troubles.
 *
 * @example
 * ```typescript
 * import { UTCDate } from "@date-fns/utc";
 * toDateFromClockTime(Temporal.Now.plainDateISO(), UTCDate);
 * ```
 *
 * @param dateTime datetime object
 * @param DateConstructor constructor of return value, `UTCDate` from "@date-fns/utc" as default
 */
export function toDateFromClockTime<DateType extends Date>(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
	DateConstructor: GenericDateConstructor<DateType>,
): DateType;
export function toDateFromClockTime<DateType extends Date>(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
	DateConstructor?: GenericDateConstructor<DateType>,
) {
	if (isPlainYearMonth(dateTime)) {
		const pd = dateTime.toPlainDate({ day: 1 }).withCalendar("iso8601");
		return createDate(DateConstructor, pd.year, pd.month, pd.day);
	}
	if (isPlainMonthDay(dateTime)) {
		if (dateTime.calendarId === "iso8601") {
			const pd = dateTime.toPlainDate({ year: 1972 });
			return createDate(DateConstructor, pd.year, pd.month, pd.day);
		}
		const { year, month, day } = parseIsoString(dateTime.toString());
		return createDate(DateConstructor, year, month, day);
	}
	if (isPlainTime(dateTime)) {
		// Set default date to 2000-01-01
		return createDate(
			DateConstructor,
			2000,
			0,
			1,
			dateTime.hour,
			dateTime.minute,
			dateTime.second,
			dateTime.millisecond,
		);
	}
	const plainDateTime = isZonedDateTime(dateTime)
		? dateTime.toPlainDateTime().withCalendar("iso8601")
		: isPlainDate(dateTime)
			? dateTime.toPlainDateTime().withCalendar("iso8601")
			: dateTime.withCalendar("iso8601");
	return createDate(
		DateConstructor,
		plainDateTime.year,
		plainDateTime.month,
		plainDateTime.day,
		plainDateTime.hour,
		plainDateTime.minute,
		plainDateTime.second,
		plainDateTime.millisecond,
	);
}
