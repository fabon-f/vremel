import type { Temporal } from "../types.js";
import { fromModifiedJulianDate } from "./fromModifiedJulianDate.js";

/**
 * Returns a temporal object which corresponds to the given julian date.
 *
 * @param julianDate julian date
 * @param Instant `Temporal.Instant` class
 * @returns `Temporal.Instant` which corresponds to the given julian date
 */
export function fromJulianDate<InstantClassType extends typeof Temporal.Instant>(
	julianDate: number,
	Instant: InstantClassType,
): InstanceType<InstantClassType> {
	return fromModifiedJulianDate(julianDate - 2400000.5, Instant);
}
