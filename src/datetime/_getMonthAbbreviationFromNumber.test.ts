import { expect, test } from "vitest";

import { getMonthAbbreviationFromNumber } from "./_getMonthAbbreviationFromNumber.js";

test("getMonthAbbreviationFromNumber", () => {
	expect(getMonthAbbreviationFromNumber(1)).toEqual("Jan");
	expect(getMonthAbbreviationFromNumber(2)).toEqual("Feb");
	expect(getMonthAbbreviationFromNumber(3)).toEqual("Mar");
	expect(getMonthAbbreviationFromNumber(4)).toEqual("Apr");
	expect(getMonthAbbreviationFromNumber(5)).toEqual("May");
	expect(getMonthAbbreviationFromNumber(6)).toEqual("Jun");
	expect(getMonthAbbreviationFromNumber(7)).toEqual("Jul");
	expect(getMonthAbbreviationFromNumber(8)).toEqual("Aug");
	expect(getMonthAbbreviationFromNumber(9)).toEqual("Sep");
	expect(getMonthAbbreviationFromNumber(10)).toEqual("Oct");
	expect(getMonthAbbreviationFromNumber(11)).toEqual("Nov");
	expect(getMonthAbbreviationFromNumber(12)).toEqual("Dec");
});
