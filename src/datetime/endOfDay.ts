import type { Temporal } from "../types.js";

/**
 * Returns the end of a day for the given datetime
 * @param dt datetime object which includes date and time info
 * @returns Temporal object which represents the end of the day
 */
export function endOfDay(dt: Temporal.PlainDateTime): Temporal.PlainDateTime {
	return dt.with({
		hour: 23,
		minute: 59,
		second: 59,
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	});
}
