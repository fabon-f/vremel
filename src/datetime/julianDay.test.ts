import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { julianDay } from "./julianDay.js";

test("julian day", () => {
	expect(julianDay(Temporal.Instant.from("2024-01-01T12:34:56Z"))).toBeCloseTo(
		2460311.024259259,
		8,
	);
	expect(julianDay(Temporal.Instant.from("1858-11-17T00:00:00Z"))).toEqual(
		2400000.5,
	);
	expect(julianDay(Temporal.Instant.from("1858-11-01T00:00:00Z"))).toEqual(
		2399984.5,
	);
});
