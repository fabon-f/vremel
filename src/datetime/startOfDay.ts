import type { Temporal } from "../types.js";

/**
 * Returns the start of a day for the given datetime
 * @param dt datetime object which includes time info
 * @returns Temporal object which represents the start of a day
 */
export function startOfDay<
	DateTime extends Temporal.PlainTime | Temporal.PlainDateTime,
>(dt: DateTime): DateTime {
	return dt.with({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	}) as DateTime;
}