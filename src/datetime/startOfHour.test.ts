import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfHour } from "./startOfHour.js";

test("PlainDateTime", () => {
	expect(
		startOfHour(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:00:00"));
});

test("PlainTime", () => {
	expect(startOfHour(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:00:00"),
	);
});

test("ZonedDateTime without offset transition", () => {
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from(
				"2024-01-01T01:23:45.678901234+09:00[Asia/Tokyo]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-01-01T01:00:00+09:00[Asia/Tokyo]"),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from(
				"2023-04-02T01:45:00+10:30[Australia/Lord_Howe]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2023-04-02T01:00:00+11:00[Australia/Lord_Howe]",
		),
	);
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from(
				"1945-09-11T23:30:00+07:30[Asia/Kuala_Lumpur]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("1945-09-11T23:00:00+09:00[Asia/Kuala_Lumpur]"),
	);
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from(
				"2010-11-07T00:30:00-03:30[America/St_Johns]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2010-11-07T00:00:00-02:30[America/St_Johns]"),
	);
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from(
				"1944-09-10T02:30:00-04:00[America/Barbados]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("1944-09-10T02:00:00-03:30[America/Barbados]"),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from(
				"1984-10-01T00:45:00-03:00[America/Paramaribo]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"1984-10-01T00:30:00-03:00[America/Paramaribo]",
		),
	);
	expect(
		startOfHour(
			Temporal.ZonedDateTime.from("1919-03-31T00:45:00-04:00[America/Toronto]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("1919-03-31T00:30:00-04:00[America/Toronto]"),
	);
});
