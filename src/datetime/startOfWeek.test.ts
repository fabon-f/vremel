import { expect, test } from "vitest";

import { startOfWeek } from "./startOfWeek.js";

test("PlainDateTime", () => {
	expect(
		startOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
	expect(
		startOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDateTime.from("2023-12-31T00:00:00"));
	expect(
		startOfWeek(Temporal.PlainDateTime.from("2024-01-07T12:34:56.789123456"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("PlainDate", () => {
	expect(startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 1 })).toEqual(
		Temporal.PlainDate.from("2024-01-01"),
	);
	expect(startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 7 })).toEqual(
		Temporal.PlainDate.from("2023-12-31"),
	);
	expect(
		startOfWeek(Temporal.PlainDate.from("2024-01-07"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-01"));
});

test("invalid day of week", () => {
	expect(() => {
		startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 8 });
	}).toThrowError();
	expect(() => {
		startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: -1 });
	}).toThrowError();
});

test("ZonedDateTime without offset transition", () => {
	expect(
		startOfWeek(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-01T00:00:00+09:00[Asia/Tokyo]"));
	expect(
		startOfWeek(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2023-12-31T00:00:00+09:00[Asia/Tokyo]"));
	expect(
		startOfWeek(Temporal.ZonedDateTime.from("2024-01-07T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-01T00:00:00+09:00[Asia/Tokyo]"));
});

test("ZonedDateTime and forward transition", () => {
	expect(
		startOfWeek(Temporal.ZonedDateTime.from("2012-01-01T00:00:00+14:00[Pacific/Apia]"), {
			firstDayOfWeek: 5,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2011-12-31T00:00:00+14:00[Pacific/Apia]"));
	expect(
		startOfWeek(Temporal.ZonedDateTime.from("1919-04-02T00:00:00-04:00[America/Toronto]"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.ZonedDateTime.from("1919-03-31T00:30:00-04:00[America/Toronto]"));
});

test("ZonedDateTime and backward transition", () => {
	expect(
		startOfWeek(Temporal.ZonedDateTime.from("2010-11-09T00:00:00-03:30[America/St_Johns]"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2010-11-07T00:00:00-02:30[America/St_Johns]"));
});
