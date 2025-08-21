import type { Temporal } from "../types.js";
import { getTimeZoneTransitionBetween } from "./_getTimeZoneTransitionBetween.js";

/** @internal */
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
		return getTimeZoneTransitionBetween(earlier, later).subtract({
			nanoseconds: 1,
		});
	}
}
