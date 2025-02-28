import { isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { startOfTimeForZonedDateTime } from "./_startOfTimeForZonedDateTime.js";

/**
 * Returns the start of a hour for the given datetime
 * @param dt datetime object which includes time info
 * @returns Temporal object which represents the start of a hour
 */
export function startOfHour<
	DateTime extends
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime,
>(dt: DateTime): DateTime {
	const withArg = {
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	};
	if (!isZonedDateTime(dt)) {
		return dt.with(withArg) as DateTime;
	}

	return startOfTimeForZonedDateTime(dt, withArg) as DateTime;
}
