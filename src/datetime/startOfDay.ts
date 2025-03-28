import { isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Returns the start of a day for the given datetime
 * @param dt datetime object which includes date and time info
 * @returns Temporal object which represents the start of a day
 */
export function startOfDay<
	DateTime extends Temporal.PlainDateTime | Temporal.ZonedDateTime,
>(dt: DateTime): DateTime {
	return (
		isZonedDateTime(dt) ?
			dt.startOfDay()
		:	dt.with({
				hour: 0,
				minute: 0,
				second: 0,
				millisecond: 0,
				microsecond: 0,
				nanosecond: 0,
			})) as DateTime;
}
