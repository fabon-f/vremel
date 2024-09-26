import type { Temporal } from "../types.js";

/**
 * Returns a temporal object which corresponds to the given julian date.
 *
 * @param julianDate julian date
 * @param Instant `Temporal.Instant` class
 * @returns `Temporal.Instant` which corresponds to the given julian date
 */
export function fromJulianDate(
	julianDate: number,
	Instant: typeof Temporal.Instant,
): Temporal.Instant {
	const modifiedJulianDay = julianDate - 2400000.5;
	const modifiedJulianDayInt = Math.floor(modifiedJulianDay);
	const nanoseconds = Math.floor(
		(modifiedJulianDay - modifiedJulianDayInt) * 8.64e13,
	);
	return Instant.from("1858-11-17T00:00:00Z").add({
		hours: modifiedJulianDayInt * 24,
		nanoseconds,
	});
}
