import { assertSameType, assertValidInterval } from "../assert.js";
import type { Interval, Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Checks whether the given datetime is within the interval.
 * @param dateTime temporal object
 * @param interval interval
 * @returns Whether the given datetime is within the interval
 */
export function isWithinInterval<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dateTime: DateTime, interval: Interval<DateTime>): boolean {
	assertValidInterval(interval);
	assertSameType(dateTime, interval.start);
	return compare(dateTime, interval.start) !== -1 && compare(dateTime, interval.end) !== 1;
}
