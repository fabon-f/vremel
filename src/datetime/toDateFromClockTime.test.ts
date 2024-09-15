import { UTCDate, UTCDateMini } from "@date-fns/utc";
import { Temporal } from "@js-temporal/polyfill";
import { lightFormat } from "date-fns";
import { expect, test } from "vitest";

import { TimeZoneModifier } from "../_test/TimeZoneModifier.js";
import { toDateFromClockTime } from "./toDateFromClockTime.js";

const zoneModifier = new TimeZoneModifier();

test("ZonedDateTime", () => {
	const date = toDateFromClockTime(
		Temporal.ZonedDateTime.from("2024-01-01T03:00:00-05:00[America/Toronto]"),
	);
	expect(lightFormat(date, "yyyy-MM-dd HH:mm:ss")).toBe("2024-01-01 03:00:00");
});
test("PlainDate", () => {
	const date = toDateFromClockTime(Temporal.PlainDate.from("2024-01-01"));
	expect(lightFormat(date, "yyyy-MM-dd")).toBe("2024-01-01");
});
test("PlainTime", () => {
	const date = toDateFromClockTime(Temporal.PlainTime.from("04:00:00"));
	expect(lightFormat(date, "HH:mm:ss")).toBe("04:00:00");
});
test("PlainDateTime", () => {
	const date = toDateFromClockTime(
		Temporal.PlainDateTime.from("2024-01-01T03:00:00"),
	);
	expect(lightFormat(date, "yyyy-MM-dd HH:mm:ss")).toBe("2024-01-01 03:00:00");
});
test("PlainYearMonth", () => {
	const date = toDateFromClockTime(Temporal.PlainYearMonth.from("2024-01"));
	expect(lightFormat(date, "yyyy-MM")).toBe("2024-01");
});
test("PlainMonthDay", () => {
	const date = toDateFromClockTime(Temporal.PlainMonthDay.from("02-29"));
	expect(lightFormat(date, "MM-dd")).toBe("02-29");
});

test("timezone", () => {
	zoneModifier.set("America/Chicago");
	const date = toDateFromClockTime(
		// this datetime doesn't exist in USA due to DST
		Temporal.PlainDateTime.from("2023-03-12T02:30:00"),
	);
	expect(lightFormat(date, "yyyy-MM-dd HH:mm:ss")).toBe("2023-03-12 02:30:00");
	zoneModifier.restore();
});

test("PlainMonthDay with non-ISO calendar", () => {
	const md = Temporal.PlainMonthDay.from({
		monthCode: "M05L",
		day: 13,
		calendar: "hebrew",
	});
	const md2 = Temporal.PlainDate.from(
		lightFormat(toDateFromClockTime(md), "yyyy-MM-dd"),
	)
		.withCalendar("hebrew")
		.toPlainMonthDay();
	expect(md).toEqual(md2);
});

test("PlainYearMonth with non-ISO calendar", () => {
	const ym = Temporal.PlainYearMonth.from({
		year: 5779,
		monthCode: "M05L",
		calendar: "hebrew",
	});
	const ym2 = Temporal.PlainDate.from(
		lightFormat(toDateFromClockTime(ym), "yyyy-MM-dd"),
	)
		.withCalendar("hebrew")
		.toPlainYearMonth();
	expect(ym).toEqual(ym2);
});

test("PlainDate with non-ISO calendar", () => {
	const pd = Temporal.PlainDate.from({
		year: 5779,
		monthCode: "M05L",
		day: 13,
		calendar: "hebrew",
	});
	const pd2 = Temporal.PlainDate.from(
		lightFormat(toDateFromClockTime(pd), "yyyy-MM-dd"),
	).withCalendar("hebrew");
	expect(pd).toEqual(pd2);
});

test("PlainDateTime with non-ISO calendar", () => {
	const pdt = Temporal.PlainDate.from({
		year: 5779,
		monthCode: "M05L",
		day: 13,
		calendar: "hebrew",
	}).toPlainDateTime();
	const pdt2 = Temporal.PlainDateTime.from(
		lightFormat(toDateFromClockTime(pdt), "yyyy-MM-dd'T'HH:mm:ss"),
	).withCalendar("hebrew");
	expect(pdt).toEqual(pdt2);
});

test("ZonedDateTime with non-ISO calendar", () => {
	const zdt = Temporal.PlainDate.from({
		year: 5779,
		monthCode: "M05L",
		day: 13,
		calendar: "hebrew",
	})
		.toPlainDateTime()
		.toZonedDateTime("Asia/Tokyo");
	const pdt2 = Temporal.PlainDateTime.from(
		lightFormat(toDateFromClockTime(zdt), "yyyy-MM-dd'T'HH:mm:ss"),
	).withCalendar("hebrew");
	expect(zdt.toPlainDateTime()).toEqual(pdt2);
});

test("date constructor type", () => {
	expect(
		toDateFromClockTime(Temporal.Now.plainDateISO(), UTCDate),
	).toBeInstanceOf(UTCDate);
	expect(toDateFromClockTime(Temporal.Now.plainDateISO())).toBeInstanceOf(
		UTCDateMini,
	);
});
