import { isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { endOfTimeForZonedDateTime } from "./_endOfTimeForZonedDateTime.js";

/**
 * Returns the end of a hour for the given datetime
 * @param dt datetime object which includes time info
 * @returns Temporal object which represents the end of the hour
 */
export function endOfHour<
	DateTime extends
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime,
>(dt: DateTime): DateTime {
	const withArg = {
		minute: 59,
		second: 59,
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	};
	if (!isZonedDateTime(dt)) {
		return dt.with({
			minute: 59,
			second: 59,
			millisecond: 999,
			microsecond: 999,
			nanosecond: 999,
		}) as DateTime;
	}
	return endOfTimeForZonedDateTime(dt, withArg) as DateTime;
}
