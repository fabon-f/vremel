import { expect, test } from "vitest";

import { startOfDay } from "./startOfDay.js";

test("PlainDateTime", () => {
	expect(
		startOfDay(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("ZonedDateTime without offset transition", () => {
	expect(
		startOfDay(
			Temporal.ZonedDateTime.from(
				"2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-01-01T00:00:00+09:00[Asia/Tokyo]"),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		startOfDay(
			Temporal.ZonedDateTime.from("2024-10-27T23:00:00+00:00[Europe/London]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-10-27T00:00:00+01:00[Europe/London]"),
	);
	expect(
		startOfDay(
			Temporal.ZonedDateTime.from(
				"2010-11-07T23:00:00-03:30[America/St_Johns]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2010-11-07T00:00:00-02:30[America/St_Johns]"),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		startOfDay(
			Temporal.ZonedDateTime.from("2024-03-31T23:00:00+01:00[Europe/London]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-03-31T00:00:00+00:00[Europe/London]"),
	);
	expect(
		startOfDay(
			Temporal.ZonedDateTime.from("2024-03-31T12:00:00+03:00[Asia/Beirut]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-03-31T01:00:00+03:00[Asia/Beirut]"),
	);
	expect(
		startOfDay(
			Temporal.ZonedDateTime.from("1919-03-31T12:00:00-04:00[America/Toronto]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("1919-03-31T00:30:00-04:00[America/Toronto]"),
	);
});

test("ZonedDateTime with `getTimeZoneTransition` edge case", () => {
	// temporary workaround for https://github.com/fullcalendar/temporal-polyfill/issues/73
	// skip the test for `temporal-polyfill`
	// TODO: remove the workaround when the bug is fixed
	let zdt;
	try {
		zdt = Temporal.ZonedDateTime.from(
			"2000-10-08T01:00:00-03:00[America/Boa_Vista]",
		);
	} catch {
		return;
	}
	expect(startOfDay(zdt)).toEqual(
		Temporal.ZonedDateTime.from("2000-10-08T01:00:00-03:00[America/Boa_Vista]"),
	);
});
