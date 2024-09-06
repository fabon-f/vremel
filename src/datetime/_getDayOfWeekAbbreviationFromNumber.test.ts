import { expect, test } from "vitest";

import { getDayOfWeekAbbreviationFromNumber } from "./_getDayOfWeekAbbreviationFromNumber.js";

test("getDayOfWeekAbbreviationFromNumber", () => {
	expect(getDayOfWeekAbbreviationFromNumber(1)).toEqual("Mon");
	expect(getDayOfWeekAbbreviationFromNumber(2)).toEqual("Tue");
	expect(getDayOfWeekAbbreviationFromNumber(3)).toEqual("Wed");
	expect(getDayOfWeekAbbreviationFromNumber(4)).toEqual("Thu");
	expect(getDayOfWeekAbbreviationFromNumber(5)).toEqual("Fri");
	expect(getDayOfWeekAbbreviationFromNumber(6)).toEqual("Sat");
	expect(getDayOfWeekAbbreviationFromNumber(7)).toEqual("Sun");
});
