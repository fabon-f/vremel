import type { Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Returns the shortest of the given durations.
 * @param durations array of durations
 * @param options the options passed to `Temporal.Duration.compare`
 * @returns the shortest of the duration
 */
export function shortest(
	durations: Temporal.Duration[],
	options?: Temporal.DurationArithmeticOptions,
): Temporal.Duration {
	return durations.reduce((a, b) => (compare(a, b, options) === 1 ? b : a));
}
