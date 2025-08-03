import { expect, test } from "vitest";

import { isSameWeek } from "./isSameWeek.js";

test.for([
	["2025-01-05", "2025-01-06", 1, false],
	["2025-01-05", "2025-01-06", 7, true],
	["2024-12-30", "2025-01-05", 1, true],
	["2024-12-30", "2025-01-05", 7, false],
] as [string, string, number, boolean][])(
	"PlainDate (%s and %s, firstDayOfWeek: %i)",
	([date1, date2, firstDayOfWeek, expected]) => {
		expect(
			isSameWeek(
				Temporal.PlainDate.from(date1),
				Temporal.PlainDate.from(date2),
				{
					firstDayOfWeek,
				},
			),
		).toEqual(expected);
	},
);

test("PlainDate with different calendar", () => {
	expect(() => {
		isSameWeek(
			Temporal.PlainDate.from("2025-01-01"),
			Temporal.PlainDate.from("2025-01-01[u-ca=hebrew]"),
			{ firstDayOfWeek: 7 },
		);
	}).toThrow();
});

test("PlainDateTime", () => {
	expect(
		isSameWeek(
			Temporal.PlainDateTime.from("2025-01-01T00:00:00"),
			Temporal.PlainDateTime.from("2025-01-02T12:00:00"),
			{ firstDayOfWeek: 7 },
		),
	).toEqual(true);
});

test("ZonedDateTime", () => {
	expect(
		isSameWeek(
			Temporal.ZonedDateTime.from("2025-01-12T23:00:00+09:00[Asia/Tokyo]"),
			Temporal.ZonedDateTime.from(
				"2025-01-06T00:00:00-08:00[America/Los_Angeles]",
			),
			{ firstDayOfWeek: 1 },
		),
	).toEqual(true);
});
