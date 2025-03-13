import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { withDayOfWeek } from "./withDayOfWeek.js";

test.each([
	["2025-01-06", 3, 5, "2025-01-08"],
	["2025-01-06", 5, 3, "2025-01-03"],
	["2025-01-08", 1, 5, "2025-01-06"],
	["2025-01-08", 5, 1, "2025-01-10"],
	["2025-01-10", 1, 3, "2025-01-13"],
	["2025-01-10", 3, 1, "2025-01-08"],
])(
	"PlainDate (%s, dayOfWeek: %d, firstDayOfWeek: %d)",
	(date, dayOfWeek, firstDayOfWeek, expected) => {
		expect(
			withDayOfWeek(Temporal.PlainDate.from(date), dayOfWeek, {
				firstDayOfWeek,
			}),
		).toEqual(Temporal.PlainDate.from(expected));
	},
);

test("PlainDateTime", () => {
	expect(
		withDayOfWeek(Temporal.PlainDateTime.from("2025-01-01T12:30:00"), 5, {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2025-01-03T12:30:00"));
});

test("ZonedDateTime without offset transition", () => {
	expect(
		withDayOfWeek(
			Temporal.ZonedDateTime.from("2025-01-01T12:00:00+09:00[Asia/Tokyo]"),
			5,
			{ firstDayOfWeek: 1 },
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2025-01-03T12:00:00+09:00[Asia/Tokyo]"),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		withDayOfWeek(
			Temporal.ZonedDateTime.from("2024-03-29T23:10:00-02:00[America/Nuuk]"),
			6,
			{ firstDayOfWeek: 1 },
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-03-31T00:10:00-01:00[America/Nuuk]"),
	);
	expect(
		withDayOfWeek(
			Temporal.ZonedDateTime.from("2024-03-29T23:10:00-02:00[America/Nuuk]"),
			6,
			{ firstDayOfWeek: 1, disambiguation: "earlier" },
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-03-30T22:10:00-02:00[America/Nuuk]"),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		withDayOfWeek(
			Temporal.ZonedDateTime.from("2024-10-23T01:30:00+01:00[Europe/London]"),
			7,
			{ firstDayOfWeek: 1 },
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-10-27T01:30:00+01:00[Europe/London]"),
	);
	expect(
		withDayOfWeek(
			Temporal.ZonedDateTime.from("2024-10-29T01:30:00+00:00[Europe/London]"),
			7,
			{ firstDayOfWeek: 7 },
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-10-27T01:30:00+00:00[Europe/London]"),
	);
	expect(
		withDayOfWeek(
			Temporal.ZonedDateTime.from("2024-10-23T01:30:00+01:00[Europe/London]"),
			7,
			{ firstDayOfWeek: 1, disambiguation: "later", offset: "ignore" },
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-10-27T01:30:00+00:00[Europe/London]"),
	);
});
