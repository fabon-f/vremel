import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { shortest } from "./shortest.js";

test("shortest()", () => {
	const a = ["PT3H29M", "PT208M", "PT210M"].map((d) =>
		Temporal.Duration.from(d),
	);
	expect(shortest(a)).toBe(a[1]);
});

test("shortest() with relativeTo option", () => {
	const a = ["P3M", "P90D"].map((d) => Temporal.Duration.from(d));
	expect(
		shortest(a, {
			relativeTo: Temporal.PlainDate.from("2023-02-01"),
		}),
	).toBe(a[0]);
	expect(
		shortest(a, {
			relativeTo: Temporal.PlainDate.from("2023-05-01"),
		}),
	).toBe(a[1]);
});
