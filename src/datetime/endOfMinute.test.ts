import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfMinute } from "./endOfMinute.js";

test("PlainDateTime", () => {
	expect(
		endOfMinute(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:34:59.999999999"));
});

test("PlainTime", () => {
	expect(endOfMinute(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:34:59.999999999"),
	);
});
