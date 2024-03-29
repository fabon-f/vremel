import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { earliest } from "./earliest.js";

test("earliest() with Instant", () => {
	const target = [1700000000, 1720000000, 1600000000].map((t) =>
		Temporal.Instant.fromEpochSeconds(t),
	);
	expect(earliest(target)).toBe(target[2]);
});
test("earliest() with ZonedDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.ZonedDateTime.from(t));
	expect(earliest(target)).toBe(target[0]);
});
test("earliest() with PlainDate", () => {
	const target = ["2024-01-01[u-ca=hebrew]", "2024-01-02", "2023-12-23"].map(
		(t) => Temporal.PlainDate.from(t),
	);
	expect(earliest(target)).toBe(target[2]);
});
test("earliest() with PlainTime", () => {
	const target = ["03:00:00", "06:00:00", "23:45:00"].map((t) =>
		Temporal.PlainTime.from(t),
	);
	expect(earliest(target)).toBe(target[0]);
});
test("earliest() with PlainDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.PlainDateTime.from(t));
	expect(earliest(target)).toBe(target[2]);
});
test("PlainYearMonth", () => {
	const target = ["2023-12", "2024-01", "2023-11"].map((t) =>
		Temporal.PlainYearMonth.from(t),
	);
	expect(earliest(target)).toBe(target[2]);
});
test("PlainMonthDay", () => {
	expect(() => {
		// @ts-expect-error
		earliest([Temporal.PlainMonthDay.from("12-03")]);
	}).toThrow();
});

test("Typecheck", () => {
	expect(() => {
		// @ts-expect-error
		earliest<Temporal.Instant | Temporal.ZonedDateTime>([
			Temporal.Now.instant(),
			Temporal.Now.zonedDateTimeISO(),
		]);
	}).toThrow();
});
