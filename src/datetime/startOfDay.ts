import { isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { startOfTimeForZonedDateTime } from "./_startOfTimeForZonedDateTime.js";

/**
 * Returns the start of a day for the given datetime
 * @param dt datetime object which includes date and time info
 * @returns Temporal object which represents the start of a day
 */
export function startOfDay<
	DateTime extends Temporal.PlainDateTime | Temporal.ZonedDateTime,
>(dt: DateTime): DateTime {
	const withArg = {
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

	// TODO: Use built-in `startOfDay` method after polyfills follow up https://github.com/tc39/proposal-temporal/pull/2918
	return startOfTimeForZonedDateTime(dt, withArg) as DateTime;
}
