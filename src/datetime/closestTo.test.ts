import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { closestTo } from "./closestTo.js";

test("Instant", () => {
	const target = [1700000000, 1720000000, 1600000000].map((t) =>
		Temporal.Instant.fromEpochMilliseconds(t * 1000),
	);
	const dt = Temporal.Instant.fromEpochMilliseconds(1640000000 * 1000);
	expect(closestTo(dt, target)).toBe(target[2]);
});
test("ZonedDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.ZonedDateTime.from(t));
	const dt = Temporal.ZonedDateTime.from(
		"2024-01-01T11:30:00+09:00[Asia/Tokyo]",
	);
	expect(closestTo(dt, target)).toBe(target[1]);
});
test("PlainDate", () => {
	const target = ["2024-01-01", "2024-01-02", "2023-12-23"].map((t) =>
		Temporal.PlainDate.from(t),
	);
	const dt = Temporal.PlainDate.from("2024-01-03");
	expect(closestTo(dt, target)).toBe(target[1]);
});

test("PlainTime", () => {
	const target = ["03:00:00", "06:00:00", "23:45:00"].map((t) =>
		Temporal.PlainTime.from(t),
	);
	const dt = Temporal.PlainTime.from("18:00:00");
	expect(closestTo(dt, target)).toBe(target[2]);
});
test("PlainDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.PlainDateTime.from(t));
	const dt = Temporal.PlainDateTime.from(
		"2024-01-01T04:00:00+03:00[Europe/Moscow]",
	);
	expect(closestTo(dt, target)).toBe(target[1]);
});
test("PlainYearMonth", () => {
	const target = ["2023-12", "2024-01", "2023-08"].map((t) =>
		Temporal.PlainYearMonth.from(t),
	);
	const dt = Temporal.PlainYearMonth.from("2023-11");
	expect(closestTo(dt, target)).toBe(target[0]);
});
test("PlainYearMonth of non-ISO calendar", () => {
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
	expect(closestTo(dt, target)).toBe(target[0]);
	expect(() => {
		closestTo(Temporal.PlainYearMonth.from("2024-01"), target);
	}).toThrowError(RangeError);
});

test("Typecheck", () => {
	expect(() => {
		closestTo(
			Temporal.Now.zonedDateTimeISO(),
			// @ts-expect-error
			[Temporal.Now.instant()],
		);
	}).toThrow();
});
