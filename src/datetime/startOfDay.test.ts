import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfDay } from "./startOfDay.js";

test("PlainDateTime", () => {
	expect(
		startOfDay(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("PlainTime", () => {
	expect(startOfDay(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("00:00:00"),
	);
});
