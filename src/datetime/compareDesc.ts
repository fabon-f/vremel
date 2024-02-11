import type { ComparableDateTimeType, Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Compares two datetime objects in reverse chronological order and returns -1, 0, or 1.
 * @param a datetime object
 * @param b datetime object
 * @returns the result of the comparison
 */
export function compareDesc(
	a: Temporal.Instant,
	b: Temporal.Instant,
): -1 | 0 | 1;
export function compareDesc(
	a: Temporal.ZonedDateTime,
	b: Temporal.ZonedDateTime,
): -1 | 0 | 1;
export function compareDesc(
	a: Temporal.PlainDate,
	b: Temporal.PlainDate,
): -1 | 0 | 1;
export function compareDesc(
	a: Temporal.PlainTime,
	b: Temporal.PlainTime,
): -1 | 0 | 1;
export function compareDesc(
	a: Temporal.PlainDateTime,
	b: Temporal.PlainDateTime,
): -1 | 0 | 1;
export function compareDesc(
	a: Temporal.PlainYearMonth,
	b: Temporal.PlainYearMonth,
): -1 | 0 | 1;
export function compareDesc(
	a: ComparableDateTimeType,
	b: ComparableDateTimeType,
): -1 | 0 | 1;
export function compareDesc(
	a: ComparableDateTimeType,
	b: ComparableDateTimeType,
) {
	return compare(b, a);
}
