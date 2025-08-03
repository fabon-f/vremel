import { expect, test } from "vitest";

import { julianDate } from "./julianDate.js";

test("julian date", () => {
	expect(julianDate(Temporal.Instant.from("2024-01-01T12:34:56Z"))).toBeCloseTo(
		2460311.024259259,
		8,
	);
	expect(julianDate(Temporal.Instant.from("1858-11-17T00:00:00Z"))).toEqual(
		2400000.5,
	);
	expect(julianDate(Temporal.Instant.from("1858-11-01T00:00:00Z"))).toEqual(
		2399984.5,
	);
});
