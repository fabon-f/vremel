import { Temporal } from "@js-temporal/polyfill";
import { lightFormat } from "date-fns";
import { expect, test } from "vitest";

import { toDateFromClockTime } from "./toDateFromClockTime.js";

test("toDateFromClockTime() with ZonedDateTime", () => {
	const date = toDateFromClockTime(
		Temporal.ZonedDateTime.from("2024-01-01T03:00:00-05:00[America/Toronto]"),
	);
	expect(lightFormat(date, "yyyy-MM-dd HH:mm:ss")).toBe("2024-01-01 03:00:00");
});
test("toDateFromClockTime() with PlainDate", () => {
	const date = toDateFromClockTime(Temporal.PlainDate.from("2024-01-01"));
	expect(lightFormat(date, "yyyy-MM-dd")).toBe("2024-01-01");
});
test("toDateFromClockTime() with PlainTime", () => {
	const date = toDateFromClockTime(Temporal.PlainTime.from("04:00:00"));
	expect(lightFormat(date, "HH:mm:ss")).toBe("04:00:00");
});
test("toDateFromClockTime() with PlainDateTime", () => {
	const date = toDateFromClockTime(
		Temporal.PlainDateTime.from("2024-01-01T03:00:00"),
	);
	expect(lightFormat(date, "yyyy-MM-dd HH:mm:ss")).toBe("2024-01-01 03:00:00");
});
test("toDateFromClockTime() with PlainYearMonth", () => {
	const date = toDateFromClockTime(Temporal.PlainYearMonth.from("2024-01"));
	expect(lightFormat(date, "yyyy-MM")).toBe("2024-01");
});
test("toDateFromClockTime() with PlainMonthDay", () => {
	const date = toDateFromClockTime(Temporal.PlainMonthDay.from("02-29"));
	expect(lightFormat(date, "MM-dd")).toBe("02-29");
});

test("timezone", () => {
	const date = toDateFromClockTime(
		// this datetime doesn't exist in USA due to DST
		Temporal.PlainDateTime.from("2023-03-12T02:30:00"),
	);
	expect(lightFormat(date, "yyyy-MM-dd HH:mm:ss")).toBe("2023-03-12 02:30:00");
});
