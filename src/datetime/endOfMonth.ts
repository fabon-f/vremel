import { isPlainDate } from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Returns the end of a month for the given datetime
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the end of a month
 */
export function endOfMonth<
	DateTime extends Temporal.PlainDate | Temporal.PlainDateTime,
>(dt: DateTime): DateTime {
	if (isPlainDate(dt)) {
		return dt.with({
			day: Number.MAX_VALUE,
		}) as DateTime;
	}
	return dt.with({
		day: Number.MAX_VALUE,
		hour: 23,
		minute: 59,
		second: 59,
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	}) as DateTime;
}
