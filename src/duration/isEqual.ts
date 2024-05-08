import type { Temporal } from "../types.js";

/**
 * Check whether two durations are equal
 * @param a duration
 * @param b duration
 * @returns whether two durations are equal
 */
export function isEqual(a: Temporal.Duration, b: Temporal.Duration): boolean {
	return (
		a.years === b.years &&
		a.months === b.months &&
		a.weeks === b.weeks &&
		a.days === b.days &&
		a.hours === b.hours &&
		a.minutes === b.minutes &&
		a.seconds === b.seconds &&
		a.milliseconds === b.milliseconds &&
		a.microseconds === b.microseconds &&
		a.nanoseconds === b.nanoseconds
	);
}
