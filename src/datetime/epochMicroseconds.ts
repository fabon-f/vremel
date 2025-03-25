import type { Temporal } from "../types.js";

/**
 * Returns an integer of microseconds from Unix epoch until the exact time which the given temporal object represents.
 *
 * @param dt Temporal object
 * @returns epoch microseconds
 */
export function epochMicroseconds(
	dt: Temporal.Instant | Temporal.ZonedDateTime,
): bigint {
	return (
		(dt.epochNanoseconds - (((dt.epochNanoseconds % 1000n) + 1000n) % 1000n)) /
		1000n
	);
}
