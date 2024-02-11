import { getConstructor } from "../type-utils.js";
import type { Temporal } from "../types.js";

export function compare(
	one: Temporal.Duration,
	two: Temporal.Duration,
	options?: Temporal.DurationArithmeticOptions,
) {
	const Duration = getConstructor(one);
	return Duration.compare(one, two, options);
}
