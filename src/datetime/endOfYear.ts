import { isPlainDate, isPlainYearMonth } from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Returns the end of a year for the given datetime
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the end of a year
 */
export function endOfYear<
	DateTime extends
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dt: DateTime): DateTime {
	if (isPlainYearMonth(dt)) {
		return dt.with({
			month: dt.monthsInYear,
		}) as DateTime;
	}
	if (isPlainDate(dt)) {
		return dt.with({
			month: dt.monthsInYear,
			day: Number.MAX_VALUE,
		}) as DateTime;
	}
	return dt.with({
		month: dt.monthsInYear,
		day: Number.MAX_VALUE,
		hour: 23,
		minute: 59,
		second: 59,
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	}) as DateTime;
}
