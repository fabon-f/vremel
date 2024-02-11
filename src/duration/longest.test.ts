import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { longest } from "./longest.js";

test("longest()", () => {
	const a = ["PT3H29M", "PT208M", "PT210M"].map((d) =>
		Temporal.Duration.from(d),
	);
	expect(longest(a)).toBe(a[2]);
});

test("longest() with relativeTo option", () => {
	const a = ["P3M", "P90D"].map((d) => Temporal.Duration.from(d));
	expect(
		longest(a, {
			relativeTo: Temporal.PlainDate.from("2023-02-01"),
		}),
	).toBe(a[1]);
	expect(
		longest(a, {
			relativeTo: Temporal.PlainDate.from("2023-05-01"),
		}),
	).toBe(a[0]);
});
