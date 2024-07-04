import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfYear } from "./startOfYear.js";

test("PlainDateTime", () => {
	expect(
		startOfYear(Temporal.PlainDateTime.from("2024-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("PlainDate", () => {
	expect(startOfYear(Temporal.PlainDate.from("2024-02-23"))).toEqual(
		Temporal.PlainDate.from("2024-01-01"),
	);
});

test("PlainYearMonth", () => {
	expect(startOfYear(Temporal.PlainYearMonth.from("2024-02"))).toEqual(
		Temporal.PlainYearMonth.from("2024-01"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	// 19 Adar I 5784 -> 1 Tishrei 5784
	expect(
		startOfYear(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainDate.from("2023-09-16[u-ca=hebrew]"));
});

test("PlainYearMonth with non-ISO calendar", () => {
	// Adar I 5784 -> Tishrei 5784
	expect(
		startOfYear(Temporal.PlainYearMonth.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainYearMonth.from("2023-09-16[u-ca=hebrew]"));
});
