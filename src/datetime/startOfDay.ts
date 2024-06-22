import type { Temporal } from "../types.js";

/**
 * Returns the start of a day for the given datetime
 * @param dt datetime object which includes date and time info
 * @returns Temporal object which represents the start of a day
 */
export function startOfDay(dt: Temporal.PlainDateTime): Temporal.PlainDateTime {
	return dt.with({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	});
}
