import { getConstructor } from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Returns the julian date of the exact time which the given temporal object represents.
 *
 * @param instant instant
 * @returns julian date
 */
export function julianDate(instant: Temporal.Instant): number {
	const Instant = getConstructor(instant);
	// modified julian day epoch: 1858-11-17T00:00:00Z
	return (
		instant.since(Instant.from("1858-11-17T00:00:00Z")).total("day") + 2400000.5
	);
}
