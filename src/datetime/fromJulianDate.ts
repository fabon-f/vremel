import type { Temporal } from "../types.js";

export function fromJulianDate(
	julianDay: number,
	Instant: typeof Temporal.Instant,
): Temporal.Instant {
	const modifiedJulianDay = julianDay - 2400000.5;
	const modifiedJulianDayInt = Math.floor(modifiedJulianDay);
	const nanoseconds = Math.floor(
		(modifiedJulianDay - modifiedJulianDayInt) * 8.64e13,
	);
	return Instant.from("1858-11-17T00:00:00Z").add({
		hours: modifiedJulianDayInt * 24,
		nanoseconds,
	});
}
