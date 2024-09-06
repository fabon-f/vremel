import { expect, test } from "vitest";

import { getMonthNumberFromAbbreviation } from "./_getMonthNumberFromAbbreviation.js";

test("getMonthNumberFromAbbreviation", () => {
	expect(getMonthNumberFromAbbreviation("Jan")).toEqual(1);
	expect(getMonthNumberFromAbbreviation("Feb")).toEqual(2);
	expect(getMonthNumberFromAbbreviation("Mar")).toEqual(3);
	expect(getMonthNumberFromAbbreviation("Apr")).toEqual(4);
	expect(getMonthNumberFromAbbreviation("May")).toEqual(5);
	expect(getMonthNumberFromAbbreviation("Jun")).toEqual(6);
	expect(getMonthNumberFromAbbreviation("Jul")).toEqual(7);
	expect(getMonthNumberFromAbbreviation("Aug")).toEqual(8);
	expect(getMonthNumberFromAbbreviation("Sep")).toEqual(9);
	expect(getMonthNumberFromAbbreviation("Oct")).toEqual(10);
	expect(getMonthNumberFromAbbreviation("Nov")).toEqual(11);
	expect(getMonthNumberFromAbbreviation("Dec")).toEqual(12);
});

test("getMonthNumberFromAbbreviation with unknown month abbreviation", () => {
	expect(() => {
		getMonthNumberFromAbbreviation("Ja");
	}).toThrowError(/Ja/);
});
