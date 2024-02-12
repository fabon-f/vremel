import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { closestIndexTo } from "./closestIndexTo.js";

test("closestIndexTo() with Instant", () => {
	const target = [1700000000, 1720000000, 1600000000].map((t) =>
		Temporal.Instant.fromEpochSeconds(t),
	);
	const dt = Temporal.Instant.fromEpochSeconds(1640000000);
	expect(closestIndexTo(dt, target)).toBe(2);
});
test("closestIndexTo() with ZonedDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.ZonedDateTime.from(t));
	const dt = Temporal.ZonedDateTime.from(
		"2024-01-01T11:30:00+09:00[Asia/Tokyo]",
	);
	expect(closestIndexTo(dt, target)).toBe(1);
});
test("closestIndexTo() with PlainDate", () => {
	const target = ["2024-01-01[u-ca=hebrew]", "2024-01-02", "2023-12-23"].map(
		(t) => Temporal.PlainDate.from(t),
	);
	const dt = Temporal.PlainDate.from("2024-01-03");
	expect(closestIndexTo(dt, target)).toBe(1);
});

test("closestIndexTo() with PlainTime", () => {
	const target = ["03:00:00", "06:00:00", "23:45:00"].map((t) =>
		Temporal.PlainTime.from(t),
	);
	const dt = Temporal.PlainTime.from("18:00:00");
	expect(closestIndexTo(dt, target)).toBe(2);
});
test("closestIndexTo() with PlainDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo][u-ca=japanese]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.PlainDateTime.from(t));
	const dt = Temporal.PlainDateTime.from(
		"2024-01-01T04:00:00+03:00[Europe/Moscow]",
	);
	expect(closestIndexTo(dt, target)).toBe(1);
});
test("closestIndexTo() with PlainYearMonth", () => {
	const target = ["2023-12", "2024-01", "2023-08"].map((t) =>
		Temporal.PlainYearMonth.from(t),
	);
	const dt = Temporal.PlainYearMonth.from("2023-11");
	expect(closestIndexTo(dt, target)).toBe(0);
});
test("closestIndexTo() with PlainYearMonth of non-ISO calendar", () => {
	const target = [
		{ year: 5784, monthCode: "M05L" },
		{ year: 5784, monthCode: "M08" },
		{ year: 5784, monthCode: "M09" },
	].map((d) => Temporal.PlainYearMonth.from({ ...d, calendar: "hebrew" }));
	const dt = Temporal.PlainYearMonth.from({
		year: 5784,
		monthCode: "M06",
		calendar: "hebrew",
	});
	expect(closestIndexTo(dt, target)).toBe(0);
	expect(() => {
		closestIndexTo(Temporal.PlainYearMonth.from("2024-01"), target);
	}).toThrowError(RangeError);
});
