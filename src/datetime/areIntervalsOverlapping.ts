import { assertSameType, assertValidInterval } from "../assert.js";
import type { Interval } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Checks if the given two intervals are overlapping.
 * By default, it returns `true` if the end of one interval is exactly same time to the start of the other interval.
 * You can pass the `inclusive` option to change this behavior.
 *
 * @example
 * ```typescript
 * const interval1 = {
 *   start: Temporal.PlainTime.from("00:00:00"),
 *   end: Temporal.PlainTime.from("08:00:00"),
 * };
 * const interval2 = {
 *   start: Temporal.PlainTime.from("08:00:00"),
 *   end: Temporal.PlainTime.from("16:00:00"),
 * };
 * areIntervalsOverlapping(interval1, interval2); // true
 * areIntervalsOverlapping(interval1, interval2, { inclusive: false }); // false
 * ```
 *
 * @param interval1
 * @param interval2
 * @param options
 * @returns Whether two intervals are overlapping
 */
export function areIntervalsOverlapping(
	interval1: Interval,
	interval2: Interval,
	options?: {
		/**
		 * Whether the comparison is inclusive or not. Default is `true`.
		 */
		inclusive?: boolean;
	},
): boolean {
	assertValidInterval(interval1);
	assertValidInterval(interval2);
	assertSameType(interval1.start, interval2.start);
	const inclusive = options?.inclusive ?? true;
	const threshould = inclusive ? 0 : 1;
	return (
		compare(interval1.end, interval2.start) >= threshould &&
		compare(interval2.end, interval1.start) >= threshould
	);
}
