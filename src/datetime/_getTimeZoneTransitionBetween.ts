import { getConstructor } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { isNativeMethod } from "./_isNativeMethod.js";

/**
 * @internal
 * `getTimeZoneTransition` method can return inaccurate result in polyfill (see https://github.com/tc39/proposal-temporal/issues/3110).
 * However, if it is guaranteed that only 1 time zone transition occurs within the given range,
 * we can make sure to return a correct result using binary search.
 *
 */
export function getTimeZoneTransitionBetween(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
): Temporal.ZonedDateTime {
	if (start.offsetNanoseconds === end.offsetNanoseconds) {
		throw new Error("Unknown error");
	}
	if (isNativeMethod(start, "getTimeZoneTransition")) {
		const transition = start.getTimeZoneTransition("next");
		if (transition === null) {
			throw new Error("Unknown error");
		}
		return transition;
	}
	const Instant = getConstructor(start.toInstant());
	// assumption: no sub-second offset nor offset transition in fractional seconds
	let left = Math.floor(start.epochMilliseconds / 1000);
	let right = Math.floor(end.epochMilliseconds / 1000);
	while (right - left > 1) {
		const mid = Math.floor((left + right) / 2);
		const midOffset = Instant.fromEpochMilliseconds(
			mid * 1000,
		).toZonedDateTimeISO(start).offsetNanoseconds;
		if (midOffset === start.offsetNanoseconds) {
			left = mid;
		} else {
			right = mid;
		}
	}
	return Instant.fromEpochMilliseconds(right * 1000)
		.toZonedDateTimeISO(start)
		.withCalendar(start);
}
