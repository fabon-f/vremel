import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { fromJulianDate } from "./fromJulianDate.js";

test("create Instant from julian date", () => {
	// julian date 2460311.024259259 corresponds to 2024-01-01T12:34:55.999977600Z,
	// but rounding to milliseconds to deal with floating point error
	expect(
		fromJulianDate(2460311.024259259, Temporal.Instant).round("millisecond"),
	).toEqual(Temporal.Instant.from("2024-01-01T12:34:56Z"));
	expect(fromJulianDate(2400000.5, Temporal.Instant)).toEqual(
		Temporal.Instant.from("1858-11-17T00:00:00Z"),
	);
	expect(fromJulianDate(2399984.5, Temporal.Instant)).toEqual(
		Temporal.Instant.from("1858-11-01T00:00:00Z"),
	);
});
