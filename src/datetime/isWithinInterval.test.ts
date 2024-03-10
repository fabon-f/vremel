import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { isWithinInterval } from "./isWithinInterval.js";

test("Instant", () => {
	const interval = {
		start: Temporal.Instant.from("2024-01-01T00:00:00Z"),
		end: Temporal.Instant.from("2024-01-03T00:00:00Z"),
	};
	expect(
		isWithinInterval(Temporal.Instant.from("2024-01-02T00:00:00Z"), interval),
	).toEqual(true);
	expect(
		isWithinInterval(Temporal.Instant.from("2023-12-31T00:00:00Z"), interval),
	).toEqual(false);
	expect(
		isWithinInterval(Temporal.Instant.from("2024-01-04T00:00:00Z"), interval),
	).toEqual(false);
	expect(isWithinInterval(interval.start, interval)).toEqual(true);
	expect(isWithinInterval(interval.end, interval)).toEqual(true);
});

test("ZonedDateTime", () => {
	const interval = {
		start: Temporal.ZonedDateTime.from("2024-01-01T00:00:00Z[Europe/London]"),
		end: Temporal.ZonedDateTime.from("2024-01-03T00:00:00Z[Europe/London]"),
	};
	expect(
		isWithinInterval(
			Temporal.ZonedDateTime.from("2024-01-02T00:00:00Z[Europe/London]"),
			interval,
		),
	).toEqual(true);
	expect(
		isWithinInterval(
			Temporal.ZonedDateTime.from("2023-12-31T00:00:00Z[Europe/London]"),
			interval,
		),
	).toEqual(false);
	expect(
		isWithinInterval(
			Temporal.ZonedDateTime.from("2024-01-04T00:00:00Z[Europe/London]"),
			interval,
		),
	).toEqual(false);
	expect(isWithinInterval(interval.start, interval)).toEqual(true);
	expect(isWithinInterval(interval.end, interval)).toEqual(true);
});

test("PlainDate", () => {
	const interval = {
		start: Temporal.PlainDate.from("2024-01-01"),
		end: Temporal.PlainDate.from("2024-01-03"),
	};
	expect(
		isWithinInterval(Temporal.PlainDate.from("2024-01-02"), interval),
	).toEqual(true);
	expect(
		isWithinInterval(Temporal.PlainDate.from("2023-12-31"), interval),
	).toEqual(false);
	expect(
		isWithinInterval(Temporal.PlainDate.from("2024-01-04"), interval),
	).toEqual(false);
	expect(isWithinInterval(interval.start, interval)).toEqual(true);
	expect(isWithinInterval(interval.end, interval)).toEqual(true);
});

test("PlainTime", () => {
	const interval = {
		start: Temporal.PlainTime.from("08:00:00"),
		end: Temporal.PlainTime.from("16:00:00"),
	};
	expect(
		isWithinInterval(Temporal.PlainTime.from("12:00:00"), interval),
	).toEqual(true);
	expect(
		isWithinInterval(Temporal.PlainTime.from("04:00:00"), interval),
	).toEqual(false);
	expect(
		isWithinInterval(Temporal.PlainTime.from("20:00:00"), interval),
	).toEqual(false);
	expect(isWithinInterval(interval.start, interval)).toEqual(true);
	expect(isWithinInterval(interval.end, interval)).toEqual(true);
});

test("PlainDateTime", () => {
	const interval = {
		start: Temporal.PlainDateTime.from("2024-01-01T00:00:00"),
		end: Temporal.PlainDateTime.from("2024-01-03T00:00:00"),
	};
	expect(
		isWithinInterval(
			Temporal.PlainDateTime.from("2024-01-02T00:00:00"),
			interval,
		),
	).toEqual(true);
	expect(
		isWithinInterval(
			Temporal.PlainDateTime.from("2023-12-31T00:00:00"),
			interval,
		),
	).toEqual(false);
	expect(
		isWithinInterval(
			Temporal.PlainDateTime.from("2024-01-04T00:00:00"),
			interval,
		),
	).toEqual(false);
	expect(isWithinInterval(interval.start, interval)).toEqual(true);
	expect(isWithinInterval(interval.end, interval)).toEqual(true);
});

test("PlainYearMonth", () => {
	const interval = {
		start: Temporal.PlainYearMonth.from("2024-01"),
		end: Temporal.PlainYearMonth.from("2024-03"),
	};
	expect(
		isWithinInterval(Temporal.PlainYearMonth.from("2024-02"), interval),
	).toEqual(true);
	expect(
		isWithinInterval(Temporal.PlainYearMonth.from("2023-12"), interval),
	).toEqual(false);
	expect(
		isWithinInterval(Temporal.PlainYearMonth.from("2024-04"), interval),
	).toEqual(false);
	expect(isWithinInterval(interval.start, interval)).toEqual(true);
	expect(isWithinInterval(interval.end, interval)).toEqual(true);
});
