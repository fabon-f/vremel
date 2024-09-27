import type { Temporal } from "../types.js";
import { modifiedJulianDate } from "./modifiedJulianDate.js";

/**
 * Returns the julian date of the exact time which the given temporal object represents.
 *
 * @param instant instant
 * @returns julian date
 */
export function julianDate(instant: Temporal.Instant): number {
	return modifiedJulianDate(instant) + 2400000.5;
}
