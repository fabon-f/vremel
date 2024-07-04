import { isPlainDate } from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Returns the start of a month for the given datetime
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the start of a month
 */
export function startOfMonth<
	DateTime extends Temporal.PlainDate | Temporal.PlainDateTime,
>(dt: DateTime): DateTime {
	if (isPlainDate(dt)) {
		return dt.with({ day: 1 }) as DateTime;
	}
	return dt.with({
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	}) as DateTime;
}
