import { expect, test } from "vitest";

import { compareAsc } from "./compareAsc.js";

test("Instant", () => {
	const target = [1600000000, 1700000000, 1720000000].map((t) =>
		Temporal.Instant.fromEpochMilliseconds(t * 1000),
	);
	expect([...target].sort(compareAsc)).toEqual(target);
});
test("ZonedDateTime", () => {
	const target = [
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T00:00:00-05:00[America/Toronto]",
	].map((t) => Temporal.ZonedDateTime.from(t));
	expect([...target].sort(compareAsc)).toEqual(target);
});
test("PlainDate", () => {
	const target = ["2023-12-23", "2024-01-01[u-ca=hebrew]", "2024-01-02"].map((t) =>
		Temporal.PlainDate.from(t),
	);
	expect([...target].sort(compareAsc)).toEqual(target);
});
test("PlainTime", () => {
	const target = ["03:00:00", "06:00:00", "23:45:00"].map((t) => Temporal.PlainTime.from(t));
	expect([...target].sort(compareAsc)).toEqual(target);
});
test("PlainDateTime", () => {
	const target = [
		"2024-01-01T00:00:00-05:00[America/Toronto]",
		"2024-01-01T03:00:00+01:00[Europe/Paris]",
		"2024-01-01T09:00:00+09:00[Asia/Tokyo]",
	].map((t) => Temporal.PlainDateTime.from(t));
	expect([...target].sort(compareAsc)).toEqual(target);
});
test("PlainYearMonth", () => {
	const target = ["2023-11", "2023-12", "2024-01"].map((t) => Temporal.PlainYearMonth.from(t));
	expect([...target].sort(compareAsc)).toEqual(target);
});
test("PlainMonthDay", () => {
	expect(() => {
		compareAsc(
			// @ts-expect-error
			Temporal.PlainMonthDay.from("12-03"),
			Temporal.PlainMonthDay.from("12-04"),
		);
	}).toThrow();
});

test("Typecheck", () => {
	expect(() => {
		// @ts-expect-error
		compareAsc(Temporal.Now.instant(), Temporal.Now.zonedDateTimeISO());
	}).toThrow();
});
