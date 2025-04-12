import { getConstructor } from "../type-utils.js";
import type { Temporal } from "../types.js";

/** @internal */
export function compare(
	one: Temporal.Duration,
	two: Temporal.Duration,
	options?: Temporal.DurationArithmeticOptions,
): Temporal.ComparisonResult {
	const Duration = getConstructor(one);
	return Duration.compare(one, two, options);
}
