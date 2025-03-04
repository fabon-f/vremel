import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfHour } from "./endOfHour.js";

test("PlainDateTime", () => {
	expect(
		endOfHour(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:59:59.999999999"));
});

test("PlainTime", () => {
	expect(endOfHour(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:59:59.999999999"),
	);
});

test("ZonedDateTime without offset transition", () => {
	expect(
		endOfHour(
			Temporal.ZonedDateTime.from(
				"2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2024-01-01T12:59:59.999999999+09:00[Asia/Tokyo]",
		),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		endOfHour(
			Temporal.ZonedDateTime.from(
				"2023-04-02T01:00:00+11:00[Australia/Lord_Howe]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2023-04-02T01:59:59.999999999+10:30[Australia/Lord_Howe]",
		),
	);
	expect(
		endOfHour(
			Temporal.ZonedDateTime.from("2014-10-26T01:00:00+10:00[Asia/Chita]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2014-10-26T01:59:59.999999999+08:00[Asia/Chita]",
		),
	);
	expect(
		endOfHour(
			Temporal.ZonedDateTime.from(
				"2010-11-06T23:30:00-02:30[America/St_Johns]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2010-11-06T23:59:59.999999999-03:30[America/St_Johns]",
		),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		endOfHour(
			Temporal.ZonedDateTime.from(
				"1916-07-28T00:00:59.999999999+01:34:52[Europe/Athens]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"1916-07-28T00:59:59.999999999+02:00[Europe/Athens]",
		),
	);
	expect(
		endOfHour(
			Temporal.ZonedDateTime.from("1919-03-30T23:10:00-05:00[America/Toronto]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"1919-03-30T23:29:59.999999999-05:00[America/Toronto]",
		),
	);
});
