import type { Temporal } from "../types.js";

export function endOfTimeForZonedDateTime(
	zdt: Temporal.ZonedDateTime,
	withArg: Temporal.PlainDateTimeLike,
): Temporal.ZonedDateTime {
	const [earlier, later] = (["earlier", "later"] as const).map(
		(disambiguation) =>
			zdt.with(withArg, {
				offset: "ignore",
				disambiguation,
			}),
	) as [Temporal.ZonedDateTime, Temporal.ZonedDateTime];

	if (earlier.toPlainDateTime().equals(later.toPlainDateTime())) {
		// backward transition or no transition
		return later;
	} else {
		// forward transition
		const transition = earlier.getTimeZoneTransition("next");
		if (transition === null) {
			throw new Error("Unknown error");
		}
		return transition.subtract({ nanoseconds: 1 });
	}
}
