import { isPlainDate, isPlainYearMonth } from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Returns the start of a year for the given datetime
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the start of a year
 */
export function startOfYear<
	DateTime extends
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dt: DateTime): DateTime {
	if (isPlainYearMonth(dt)) {
		return dt.with({ month: 1 }) as DateTime;
	}
	if (isPlainDate(dt)) {
		return dt.with({ month: 1, day: 1 }) as DateTime;
	}
	return dt.with({
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	}) as DateTime;
}
