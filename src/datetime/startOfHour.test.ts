import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfHour } from "./startOfHour.js";

test("PlainDateTime", () => {
	expect(
		startOfHour(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:00:00"));
});

test("PlainTime", () => {
	expect(startOfHour(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:00:00"),
	);
});
