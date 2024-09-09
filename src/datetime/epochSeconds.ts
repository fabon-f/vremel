import type { Temporal } from "../types.js";

/**
 * Returns an integer of seconds from Unix epoch until the exact time which the given temporal object represents.
 *
 * @param dt Temporal object
 * @returns epoch seconds
 */
export function epochSeconds(
	dt: Temporal.Instant | Temporal.ZonedDateTime,
): number {
	return Math.floor(dt.epochMilliseconds / 1000);
}
