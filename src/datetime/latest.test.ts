import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { latest } from "./latest.js";

test("Instant", () => {
	const target = [1700000000, 1720000000, 1600000000].map((t) =>
		Temporal.Instant.fromEpochSeconds(t),
	);
	expect(latest(target)).toBe(target[1]);
});
test("ZonedDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.ZonedDateTime.from(t));
	expect(latest(target)).toBe(target[2]);
});
test("PlainDate", () => {
	const target = ["2024-01-01[u-ca=hebrew]", "2024-01-02", "2023-12-23"].map(
		(t) => Temporal.PlainDate.from(t),
	);
	expect(latest(target)).toBe(target[1]);
});
test("PlainTime", () => {
	const target = ["03:00:00", "06:00:00", "23:45:00"].map((t) =>
		Temporal.PlainTime.from(t),
	);
	expect(latest(target)).toBe(target[2]);
});
test("PlainDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.PlainDateTime.from(t));
	expect(latest(target)).toBe(target[0]);
});
test("PlainYearMonth", () => {
	const target = ["2023-12", "2024-01", "2023-11"].map((t) =>
		Temporal.PlainYearMonth.from(t),
	);
	expect(latest(target)).toBe(target[1]);
});
test("PlainMonthDay", () => {
	expect(() => {
		// @ts-expect-error
		latest([Temporal.PlainMonthDay.from("12-03")]);
	}).toThrow();
});

test("Typecheck", () => {
	expect(() => {
		// @ts-expect-error
		latest<Temporal.Instant | Temporal.ZonedDateTime>([
			Temporal.Now.instant(),
			Temporal.Now.zonedDateTimeISO(),
		]);
	}).toThrow();
});
