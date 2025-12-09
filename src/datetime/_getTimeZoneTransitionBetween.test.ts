import { expect, test } from "vitest";

import { getTimeZoneTransitionBetween } from "./_getTimeZoneTransitionBetween.js";

test("getTimeZoneTransitionBetween", () => {
	const transition1 = Temporal.ZonedDateTime.from("2024-03-31T02:00:00+01:00[Europe/London]");
	const transition2 = Temporal.ZonedDateTime.from("2024-10-27T01:00:00+00:00[Europe/London]");
	expect(
		getTimeZoneTransitionBetween(transition1.subtract({ nanoseconds: 1 }), transition1),
	).toEqual(transition1);
	expect(getTimeZoneTransitionBetween(transition1, transition2)).toEqual(transition2);
});

test("getTimeZoneTransitionBetween and non-ISO calendar", () => {
	const transition = Temporal.ZonedDateTime.from(
		"2024-03-31T02:00:00+01:00[Europe/London][u-ca=hebrew]",
	);
	expect(getTimeZoneTransitionBetween(transition.subtract({ nanoseconds: 1 }), transition)).toEqual(
		transition,
	);
});
