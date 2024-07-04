import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfMonth } from "./startOfMonth.js";

test("PlainDateTime", () => {
	expect(
		startOfMonth(Temporal.PlainDateTime.from("2024-01-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("PlainDate", () => {
	expect(startOfMonth(Temporal.PlainDate.from("2024-01-23"))).toEqual(
		Temporal.PlainDate.from("2024-01-01"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	expect(
		// 19 Adar I 5784
		startOfMonth(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainDate.from("2024-02-10[u-ca=hebrew]"));
});
