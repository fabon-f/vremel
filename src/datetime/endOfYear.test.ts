import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfYear } from "./endOfYear.js";

test("PlainDateTime", () => {
	expect(
		endOfYear(Temporal.PlainDateTime.from("2024-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-12-31T23:59:59.999999999"));
});

test("PlainDate", () => {
	expect(endOfYear(Temporal.PlainDate.from("2024-02-23"))).toEqual(
		Temporal.PlainDate.from("2024-12-31"),
	);
});

test("PlainYearMonth", () => {
	expect(endOfYear(Temporal.PlainYearMonth.from("2024-02"))).toEqual(
		Temporal.PlainYearMonth.from("2024-12"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	// 19 Adar I 5784 -> 29 Elul 5784
	expect(endOfYear(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]"))).toEqual(
		Temporal.PlainDate.from("2024-10-02[u-ca=hebrew]"),
	);
});

test("PlainYearMonth with non-ISO calendar", () => {
	// Adar I 5784 -> Elul 5784
	expect(
		endOfYear(Temporal.PlainYearMonth.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainYearMonth.from("2024-10-02[u-ca=hebrew]"));
});
