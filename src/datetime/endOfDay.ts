import type { Temporal } from "../types.js";

/**
 * Returns the end of a day for the given datetime
 * @param dt datetime object which includes time info
 * @returns Temporal object which represents the end of the day
 */
export function endOfDay<
	DateTime extends Temporal.PlainTime | Temporal.PlainDateTime,
>(dt: DateTime): DateTime {
	return dt.with({
		hour: 23,
		minute: 59,
		second: 59,
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	}) as DateTime;
}
