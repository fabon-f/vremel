import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfDay } from "./endOfDay.js";

test("PlainDateTime", () => {
	expect(
		endOfDay(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T23:59:59.999999999"));
});
