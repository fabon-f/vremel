import { expect, test } from "vitest";

import { endOfDay } from "./endOfDay.js";

test("PlainDateTime", () => {
	expect(endOfDay(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"))).toEqual(
		Temporal.PlainDateTime.from("2024-01-01T23:59:59.999999999"),
	);
});

test("ZonedDateTime without offset transition", () => {
	expect(
		endOfDay(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]")),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-01T23:59:59.999999999+09:00[Asia/Tokyo]"));
});

test("ZonedDateTime and backward transition", () => {
	expect(endOfDay(Temporal.ZonedDateTime.from("2024-10-27T00:00:00+01:00[Europe/London]"))).toEqual(
		Temporal.ZonedDateTime.from("2024-10-27T23:59:59.999999999+00:00[Europe/London]"),
	);
	expect(
		endOfDay(Temporal.ZonedDateTime.from("2010-11-06T12:00:00-02:30[America/St_Johns]")),
	).toEqual(Temporal.ZonedDateTime.from("2010-11-06T23:59:59.999999999-03:30[America/St_Johns]"));
});

test("ZonedDateTime and forward transition", () => {
	expect(endOfDay(Temporal.ZonedDateTime.from("2024-03-31T00:30:00+00:00[Europe/London]"))).toEqual(
		Temporal.ZonedDateTime.from("2024-03-31T23:59:59.999999999+01:00[Europe/London]"),
	);
	expect(
		endOfDay(Temporal.ZonedDateTime.from("1919-03-30T12:00:00-05:00[America/Toronto]")),
	).toEqual(Temporal.ZonedDateTime.from("1919-03-30T23:29:59.999999999-05:00[America/Toronto]"));
});
