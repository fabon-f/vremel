import { expect, test } from "vitest";

import { toTemporalFromClockTime } from "./toTemporalFromClockTime.js";

test("to PlainDate", () => {
	expect(
		toTemporalFromClockTime(
			new Date("2024-01-01T00:00:00"),
			Temporal.PlainDate,
		),
	).toEqual(Temporal.PlainDate.from("2024-01-01"));
});

test("to PlainTime", () => {
	expect(
		toTemporalFromClockTime(
			new Date("2024-01-01T00:00:00"),
			Temporal.PlainTime,
		),
	).toEqual(Temporal.PlainTime.from("00:00:00"));
});

test("to PlainDateTime", () => {
	expect(
		toTemporalFromClockTime(
			new Date("2024-01-01T00:00:00"),
			Temporal.PlainDateTime,
		),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("to PlainYearMonth", () => {
	expect(
		toTemporalFromClockTime(
			new Date("2024-01-01T00:00:00"),
			Temporal.PlainYearMonth,
		),
	).toEqual(Temporal.PlainYearMonth.from("2024-01"));
});

test("to PlainMonthDay", () => {
	expect(
		toTemporalFromClockTime(
			new Date("2024-01-01T00:00:00"),
			Temporal.PlainMonthDay,
		),
	).toEqual(Temporal.PlainMonthDay.from("01-01"));
});
