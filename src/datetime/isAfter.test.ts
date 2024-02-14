import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { isAfter } from "./isAfter.js";

test("isAfter() with Instant", () => {
	const a = Temporal.Instant.fromEpochSeconds(1720000000);
	const b = Temporal.Instant.fromEpochSeconds(1700000000);
	expect(isAfter(a, b)).toBe(true);
	expect(isAfter(b, a)).toBe(false);
	expect(isAfter(a, a)).toBe(false);
});
test("isAfter() with ZonedDateTime", () => {
	const a = Temporal.ZonedDateTime.from(
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	);
	const b = Temporal.ZonedDateTime.from(
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
	);
	expect(isAfter(a, b)).toBe(true);
	expect(isAfter(b, a)).toBe(false);
	expect(isAfter(a, a)).toBe(false);
});
test("isAfter() with PlainDate", () => {
	const a = Temporal.PlainDate.from("2024-01-02");
	const b = Temporal.PlainDate.from("2024-01-01[u-ca=hebrew]");
	expect(isAfter(a, b)).toBe(true);
	expect(isAfter(b, a)).toBe(false);
	expect(isAfter(a, a)).toBe(false);
});
test("isAfter() with PlainTime", () => {
	const a = Temporal.PlainTime.from("23:45:00");
	const b = Temporal.PlainTime.from("06:00:00");
	expect(isAfter(a, b)).toBe(true);
	expect(isAfter(b, a)).toBe(false);
	expect(isAfter(a, a)).toBe(false);
});
test("isAfter() with PlainDateTime", () => {
	const a = Temporal.PlainDateTime.from(
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
	);
	const b = Temporal.PlainDateTime.from(
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
	);
	expect(isAfter(a, b)).toBe(true);
	expect(isAfter(b, a)).toBe(false);
	expect(isAfter(a, a)).toBe(false);
});
test("isAfter() with PlainYearMonth", () => {
	const a = Temporal.PlainYearMonth.from("2024-01");
	const b = Temporal.PlainYearMonth.from("2023-12");
	expect(isAfter(a, b)).toBe(true);
	expect(isAfter(b, a)).toBe(false);
	expect(isAfter(a, a)).toBe(false);
});
test("isAfter() with PlainMonthDay", () => {
	expect(() => {
		isAfter(
			// @ts-expect-error
			Temporal.PlainMonthDay.from("12-03"),
			Temporal.PlainMonthDay.from("12-04"),
		);
	}).toThrow();
});

test("Typecheck", () => {
	expect(() => {
		// @ts-expect-error
		isAfter(Temporal.Now.instant(), Temporal.Now.zonedDateTimeISO());
	}).toThrow();
});
