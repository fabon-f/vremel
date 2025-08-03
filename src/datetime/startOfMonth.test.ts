import { expect, test } from "vitest";

import { startOfMonth } from "./startOfMonth.js";

test("PlainDateTime", () => {
	expect(
		startOfMonth(Temporal.PlainDateTime.from("2024-01-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("PlainDate", () => {
	expect(startOfMonth(Temporal.PlainDate.from("2024-01-23"))).toEqual(
		Temporal.PlainDate.from("2024-01-01"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	expect(
		// 19 Adar I 5784
		startOfMonth(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainDate.from("2024-02-10[u-ca=hebrew]"));
});

test("ZonedDateTime without offset transition", () => {
	expect(
		startOfMonth(
			Temporal.ZonedDateTime.from("2024-03-21T01:23:45+09:00[Asia/Tokyo]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-03-01T00:00:00+09:00[Asia/Tokyo]"),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		startOfMonth(
			Temporal.ZonedDateTime.from("2004-01-01T12:00:00+10:00[Asia/Khandyga]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2004-01-01T01:00:00+10:00[Asia/Khandyga]"),
	);
	expect(
		startOfMonth(
			Temporal.ZonedDateTime.from(
				// 17 Nisan 5761
				"2001-04-10T00:00:00+00:00[Atlantic/Azores][u-ca=hebrew]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 1 Nisan 5761
			"2001-03-25T01:00:00+00:00[Atlantic/Azores][u-ca=hebrew]",
		),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		startOfMonth(
			Temporal.ZonedDateTime.from("2015-11-11T00:00:00-05:00[America/Havana]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2015-11-01T00:00:00-04:00[America/Havana]"),
	);
	expect(
		startOfMonth(
			Temporal.ZonedDateTime.from(
				// 9 Heshvan 5763
				"2002-10-15T00:00:00+02:00[Asia/Jerusalem][u-ca=hebrew]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 1 Heshvan 5763
			"2002-10-07T00:00:00+03:00[Asia/Jerusalem][u-ca=hebrew]",
		),
	);
});
