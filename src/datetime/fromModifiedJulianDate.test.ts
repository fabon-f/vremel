import { expect, test } from "vitest";

import { fromModifiedJulianDate } from "./fromModifiedJulianDate.js";

test("create Instant from julian date", () => {
	// modified julian date 60310.524259259 corresponds to 2024-01-01T12:34:55.999977600Z,
	// but rounding to microseconds to deal with floating point error
	expect(fromModifiedJulianDate(60310.524259259, Temporal.Instant).round("microseconds")).toEqual(
		Temporal.Instant.from("2024-01-01T12:34:55.999978Z"),
	);
	expect(fromModifiedJulianDate(0, Temporal.Instant)).toEqual(
		Temporal.Instant.from("1858-11-17T00:00:00Z"),
	);
	expect(fromModifiedJulianDate(-16, Temporal.Instant)).toEqual(
		Temporal.Instant.from("1858-11-01T00:00:00Z"),
	);
});
