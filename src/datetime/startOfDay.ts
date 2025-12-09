import { isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { isNativeMethod } from "./_isNativeMethod.js";
import { startOfTimeForZonedDateTime } from "./_startOfTimeForZonedDateTime.js";

/**
 * Returns the start of a day for the given datetime
 * @param dt datetime object which includes date and time info
 * @returns Temporal object which represents the start of a day
 */
export function startOfDay<DateTime extends Temporal.PlainDateTime | Temporal.ZonedDateTime>(
	dt: DateTime,
): DateTime {
	const withArg = {
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	};
	// `startOfDay` method can return wrong result in polyfill (see https://github.com/tc39/proposal-temporal/issues/3110)
	return (
		isZonedDateTime(dt)
			? isNativeMethod(dt, "startOfDay")
				? dt.startOfDay()
				: startOfTimeForZonedDateTime(dt, withArg)
			: dt.with(withArg)
	) as DateTime;
}
