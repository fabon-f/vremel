import type { Temporal } from "../types.js";

// TODO: use `Temporal.ZonedDateTime.prototype.getTimeZoneTransition` directly after polyfills are updated
export function getTimeZoneTransition(
	zdt: Temporal.ZonedDateTime,
	direction: "next" | "previous",
): Temporal.ZonedDateTime | null {
	if (zdt.getTimeZoneTransition) {
		return zdt.getTimeZoneTransition(direction);
	}
	// legacy polyfill support
	/* eslint-disable  */
	// @ts-expect-error
	const timeZone = zdt.getTimeZone();
	const instant =
		direction === "next" ?
			timeZone.getNextTransition?.(zdt.toInstant())
		:	timeZone.getPreviousTransition?.(zdt.toInstant());
	if (instant) {
		// @ts-expect-error
		return instant.toZonedDateTimeISO(timeZone).withCalendar(zdt.getCalendar());
	} else {
		return null;
	}
	/* eslint-enable */
}
