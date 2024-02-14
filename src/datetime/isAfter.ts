import type { Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Checks whether the first datetime is after the second one.
 * @param dateTime datetime object
 * @param dateTimeToCompare datetime object to compare with
 * @returns whether the first datetime is after the second one
 */
export function isAfter<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dateTime: DateTime, dateTimeToCompare: DateTime): boolean {
	return compare(dateTime, dateTimeToCompare) === 1;
}
