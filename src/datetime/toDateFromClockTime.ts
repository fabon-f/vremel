import type { UTCDate } from "@date-fns/utc";
import { UTCDateMini } from "@date-fns/utc";

import {
	isPlainDate,
	isPlainMonthDay,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { GenericDateConstructor, Temporal } from "../types.js";

function parseIsoString(date: string) {
	const res = /^(\d{4,})-(\d{2})-(\d{2})/.exec(date);
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
 * @param DateConstructor constructor of return value, `UTCDateMini` from "@date-fns/utc" as default
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
	const DateConstructorFunction = DateConstructor ?? UTCDateMini;
	if (isPlainYearMonth(dateTime)) {
		const pd = dateTime.toPlainDate({ day: 1 }).withCalendar("iso8601");
		return new DateConstructorFunction(pd.year, pd.month - 1, pd.day);
	}
	if (isPlainMonthDay(dateTime)) {
		if (dateTime.calendarId === "iso8601") {
			const pd = dateTime.toPlainDate({ year: 1972 });
			return new DateConstructorFunction(pd.year, pd.month - 1, pd.day);
		}
		const { year, month, day } = parseIsoString(dateTime.toString());
		return new DateConstructorFunction(year, month - 1, day);
	}
	if (isPlainTime(dateTime)) {
		// Set default date to 2000-01-01
		return new DateConstructorFunction(
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
	return new DateConstructorFunction(
		plainDateTime.year,
		plainDateTime.month - 1,
		plainDateTime.day,
		plainDateTime.hour,
		plainDateTime.minute,
		plainDateTime.second,
		plainDateTime.millisecond,
	);
}
