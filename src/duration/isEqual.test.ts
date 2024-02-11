import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { isEqual } from "./isEqual.js";

test("isEqual()", () => {
	const durations = ["-P4D", "P4D", "P4D", "P3DT24H"].map((d) =>
		Temporal.Duration.from(d),
	);
	expect(isEqual(durations[0]!, durations[1]!)).toBe(false);
	expect(isEqual(durations[1]!, durations[3]!)).toBe(false);
	expect(isEqual(durations[1]!, durations[2]!)).toBe(true);
});
