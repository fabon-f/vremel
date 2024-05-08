import type { Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Returns the longest of the given durations.
 * @param durations array of durations
 * @param options the options passed to `Temporal.Duration.compare`
 * @returns the longest of the duration
 */
export function longest(
	durations: Temporal.Duration[],
	options?: Temporal.DurationArithmeticOptions,
): Temporal.Duration {
	return durations.reduce((a, b) => (compare(a, b, options) === -1 ? b : a));
}
