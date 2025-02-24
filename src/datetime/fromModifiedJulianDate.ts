import type { Temporal } from "../types.js";

/**
 * Returns a temporal object which corresponds to the given modified julian date.
 *
 * @param modifiedJulianDate modified julian date
 * @param Instant `Temporal.Instant` class
 * @returns `Temporal.Instant` which corresponds to the given modified julian date
 */
export function fromModifiedJulianDate<
	InstantClassType extends typeof Temporal.Instant,
>(
	modifiedJulianDate: number,
	Instant: InstantClassType,
): InstanceType<InstantClassType> {
	const modifiedJulianDayInt = Math.floor(modifiedJulianDate);
	const nanoseconds = Math.floor(
		(modifiedJulianDate - modifiedJulianDayInt) * 8.64e13,
	);
	return Instant.from("1858-11-17T00:00:00Z").add({
		hours: modifiedJulianDayInt * 24,
		nanoseconds,
	}) as InstanceType<InstantClassType>;
}
