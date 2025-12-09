import { isPlainDate, isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { startOfTimeForZonedDateTime } from "./_startOfTimeForZonedDateTime.js";

/**
 * Returns the start of a month for the given datetime
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the start of a month
 */
export function startOfMonth<
	DateTime extends Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
>(dt: DateTime): DateTime {
	if (isPlainDate(dt)) {
		return dt.with({ day: 1 }) as DateTime;
	}
	const withArg = {
		day: 1,
		hour: 0,
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
