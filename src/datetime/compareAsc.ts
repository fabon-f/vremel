import type { Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Compares two datetime objects in chronological order and returns -1, 0, or 1.
 * @param a datetime object
 * @param b datetime object
 * @returns the result of the comparison
 */
export function compareAsc<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(a: DateTime, b: DateTime): -1 | 0 | 1 {
	return compare(a, b);
}
