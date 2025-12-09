import { expect, test } from "vitest";

import { modifiedJulianDate } from "./modifiedJulianDate.js";

test("modified julian date", () => {
	expect(modifiedJulianDate(Temporal.Instant.from("2024-01-01T12:34:56Z"))).toBeCloseTo(
		60310.524259259,
		8,
	);
	expect(modifiedJulianDate(Temporal.Instant.from("1858-11-17T00:00:00Z"))).toEqual(0);
	expect(modifiedJulianDate(Temporal.Instant.from("1858-11-01T00:00:00Z"))).toEqual(-16);
});
