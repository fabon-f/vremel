import type { Temporal } from "../types.js";

/**
 * Returns the end of a second for the given datetime
 * @param dt datetime object which includes time info
 * @returns Temporal object which represents the end of the second
 */
export function endOfSecond<
	DateTime extends Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime,
>(dt: DateTime): DateTime {
	// assumption: no sub-second offset transition in timezone database
	return dt.with({
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	}) as DateTime;
}
