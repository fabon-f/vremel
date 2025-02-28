import type { Temporal } from "../types.js";
import { getTimeZoneTransition } from "./_getTimeZoneTransition.js";

export function startOfTimeForZonedDateTime(
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
		return earlier;
	} else {
		// forward transition
		const start = getTimeZoneTransition(earlier, "next");
		if (start === null) {
			throw new Error("Unknown error");
		}
		return start;
	}
}
