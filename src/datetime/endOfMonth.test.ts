import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfMonth } from "./endOfMonth.js";

test("PlainDateTime", () => {
	expect(
		endOfMonth(Temporal.PlainDateTime.from("2024-01-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-31T23:59:59.999999999"));
	expect(
		endOfMonth(Temporal.PlainDateTime.from("2024-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-02-29T23:59:59.999999999"));
	expect(
		endOfMonth(Temporal.PlainDateTime.from("2025-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2025-02-28T23:59:59.999999999"));
});

test("PlainDate", () => {
	expect(endOfMonth(Temporal.PlainDate.from("2024-01-23"))).toEqual(
		Temporal.PlainDate.from("2024-01-31"),
	);
	expect(endOfMonth(Temporal.PlainDate.from("2024-02-23"))).toEqual(
		Temporal.PlainDate.from("2024-02-29"),
	);
	expect(endOfMonth(Temporal.PlainDate.from("2025-02-23"))).toEqual(
		Temporal.PlainDate.from("2025-02-28"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	expect(
		// 19 Adar I 5784
		endOfMonth(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainDate.from("2024-03-10[u-ca=hebrew]"));
});
