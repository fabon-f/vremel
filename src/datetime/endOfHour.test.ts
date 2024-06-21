import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfHour } from "./endOfHour.js";

test("PlainDateTime", () => {
	expect(
		endOfHour(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:59:59.999999999"));
});

test("PlainTime", () => {
	expect(endOfHour(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:59:59.999999999"),
	);
});
