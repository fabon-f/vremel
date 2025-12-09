import { expect, test } from "vitest";

import { endOfWeek } from "./endOfWeek.js";

test("PlainDateTime", () => {
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-07T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-02T12:34:56.789123456"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-08T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-06T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-07T12:34:56.789123456"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-13T23:59:59.999999999"));
});

test("PlainDate", () => {
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-07"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-01"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-02"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-08"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-06"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-07"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-13"));
});

test("invalid day of week", () => {
	expect(() => {
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 8 });
	}).toThrowError();
	expect(() => {
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: -1 });
	}).toThrowError();
});

test("ZonedDateTime without offset transition", () => {
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-07T23:59:59.999999999+09:00[Asia/Tokyo]"));
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-01T23:59:59.999999999+09:00[Asia/Tokyo]"));
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2024-01-02T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-08T23:59:59.999999999+09:00[Asia/Tokyo]"));
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-06T23:59:59.999999999+09:00[Asia/Tokyo]"));
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2024-01-07T12:34:56.789123456+09:00[Asia/Tokyo]"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-13T23:59:59.999999999+09:00[Asia/Tokyo]"));
});

test("ZonedDateTime and forward transition", () => {
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2011-12-27T00:00:00-10:00[Pacific/Apia]"), {
			firstDayOfWeek: 6,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2011-12-29T23:59:59.999999999-10:00[Pacific/Apia]"));
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("1919-03-26T00:00:00-05:00[America/Toronto]"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.ZonedDateTime.from("1919-03-30T23:29:59.999999999-05:00[America/Toronto]"));
});

test("ZonedDateTime and backward transition", () => {
	expect(
		endOfWeek(Temporal.ZonedDateTime.from("2010-11-03T00:00:00-02:30[America/St_Johns]"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.ZonedDateTime.from("2010-11-06T23:59:59.999999999-03:30[America/St_Johns]"));
});
