import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { compareDesc } from "./compareDesc.js";

test("compareDesc() with Instant", () => {
	const target = [1720000000, 1700000000, 1600000000].map((t) =>
		Temporal.Instant.fromEpochSeconds(t),
	);
	expect([...target].sort(compareDesc)).toEqual(target);
});
test("compareDesc() with ZonedDateTime", () => {
	const target = [
		"2024-01-01T00:00:00-05:00[America/Toronto]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
	].map((t) => Temporal.ZonedDateTime.from(t));
	expect([...target].sort(compareDesc)).toEqual(target);
});
test("compareDesc() with PlainDate", () => {
	const target = ["2024-01-02", "2024-01-01[u-ca=hebrew]", "2023-12-23"].map(
		(t) => Temporal.PlainDate.from(t),
	);
	expect([...target].sort(compareDesc)).toEqual(target);
});
test("compareDesc() with PlainTime", () => {
	const target = ["23:45:00", "06:00:00", "03:00:00"].map((t) =>
		Temporal.PlainTime.from(t),
	);
	expect([...target].sort(compareDesc)).toEqual(target);
});
test("compareDesc() with PlainDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.PlainDateTime.from(t));
	expect([...target].sort(compareDesc)).toEqual(target);
});
test("compareDesc() with PlainYearMonth", () => {
	const target = ["2024-01", "2023-12", "2023-11"].map((t) =>
		Temporal.PlainYearMonth.from(t),
	);
	expect([...target].sort(compareDesc)).toEqual(target);
});
test("compareDesc() with PlainMonthDay", () => {
	expect(() => {
		compareDesc(
			// @ts-expect-error
			Temporal.PlainMonthDay.from("12-03"),
			Temporal.PlainMonthDay.from("12-04"),
		);
	}).toThrow();
});
