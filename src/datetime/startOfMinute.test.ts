import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfMinute } from "./startOfMinute.js";

test("PlainDateTime", () => {
	expect(
		startOfMinute(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:34:00"));
});

test("PlainTime", () => {
	expect(startOfMinute(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:34:00"),
	);
});
