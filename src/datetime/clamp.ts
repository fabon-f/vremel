import { assertSameType, assertValidInterval } from "../assert.js";
import type { Interval, Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Returns a datetime object clamped within the given interval.
 * * When the given datetime is earlier than the start of the interval, the start will be returned.
 * * When the given datetime is later than the end of the interval, the end will be returned.
 * * Otherwise the given datetime will be returned.
 * @param dateTime datetime object
 * @param interval interval
 * @returns clamped datetime object
 */
export function clamp<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dateTime: DateTime, interval: Interval<DateTime>): DateTime {
	assertValidInterval(interval);
	assertSameType(dateTime, interval.start);
	if (compare(dateTime, interval.start) === -1) {
		return interval.start as DateTime;
	}
	if (compare(dateTime, interval.end) === 1) {
		return interval.end as DateTime;
	}
	return dateTime;
}
