import { isPlainMonthDay } from "../type-utils.js";
import type { ArrayOf, Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Returns the earliest of the given datetime objects.
 * @param dateTimes array of datetime objects
 * @returns the earliest of the datetime objects
 */
export function earliest<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dateTimes: ArrayOf<DateTime>): DateTime {
	if (dateTimes.some(isPlainMonthDay)) {
		throw new Error("Can't compare PlainMonthDay");
	}
	return dateTimes.reduce((a, b) => (compare(a, b) === 1 ? b : a)) as DateTime;
}
