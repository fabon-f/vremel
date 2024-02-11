import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { isBefore } from "./isBefore.js";

test("isBefore() with Instant", () => {
	const a = Temporal.Instant.fromEpochSeconds(1720000000);
	const b = Temporal.Instant.fromEpochSeconds(1700000000);
	expect(isBefore(a, b)).toBe(false);
	expect(isBefore(b, a)).toBe(true);
	expect(isBefore(a, a)).toBe(false);
});
test("isBefore() with ZonedDateTime", () => {
	const a = Temporal.ZonedDateTime.from(
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	);
	const b = Temporal.ZonedDateTime.from(
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
	);
	expect(isBefore(a, b)).toBe(false);
	expect(isBefore(b, a)).toBe(true);
	expect(isBefore(a, a)).toBe(false);
});
test("isBefore() with PlainDate", () => {
	const a = Temporal.PlainDate.from("2024-01-02");
	const b = Temporal.PlainDate.from("2024-01-01[u-ca=hebrew]");
	expect(isBefore(a, b)).toBe(false);
	expect(isBefore(b, a)).toBe(true);
	expect(isBefore(a, a)).toBe(false);
});
test("isBefore() with PlainTime", () => {
	const a = Temporal.PlainTime.from("23:45:00");
	const b = Temporal.PlainTime.from("06:00:00");
	expect(isBefore(a, b)).toBe(false);
	expect(isBefore(b, a)).toBe(true);
	expect(isBefore(a, a)).toBe(false);
});
test("isBefore() with PlainDateTime", () => {
	const a = Temporal.PlainDateTime.from(
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
	);
	const b = Temporal.PlainDateTime.from(
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
	);
	expect(isBefore(a, b)).toBe(false);
	expect(isBefore(b, a)).toBe(true);
	expect(isBefore(a, a)).toBe(false);
});
test("isBefore() with PlainYearMonth", () => {
	const a = Temporal.PlainYearMonth.from("2024-01");
	const b = Temporal.PlainYearMonth.from("2023-12");
	expect(isBefore(a, b)).toBe(false);
	expect(isBefore(b, a)).toBe(true);
	expect(isBefore(a, a)).toBe(false);
});
test("isBefore() with PlainMonthDay", () => {
	expect(() => {
		isBefore(
			// @ts-expect-error
			Temporal.PlainMonthDay.from("12-03"),
			Temporal.PlainMonthDay.from("12-04"),
		);
	}).toThrow();
});
