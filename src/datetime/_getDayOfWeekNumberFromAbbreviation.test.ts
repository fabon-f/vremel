import { expect, test } from "vitest";

import { getDayOfWeekNumberFromAbbreviation } from "./_getDayOfWeekNumberFromAbbreviation.js";

test("getDayOfWeekNumberFromAbbreviation", () => {
	expect(getDayOfWeekNumberFromAbbreviation("Mon")).toEqual(1);
	expect(getDayOfWeekNumberFromAbbreviation("Tue")).toEqual(2);
	expect(getDayOfWeekNumberFromAbbreviation("Wed")).toEqual(3);
	expect(getDayOfWeekNumberFromAbbreviation("Thu")).toEqual(4);
	expect(getDayOfWeekNumberFromAbbreviation("Fri")).toEqual(5);
	expect(getDayOfWeekNumberFromAbbreviation("Sat")).toEqual(6);
	expect(getDayOfWeekNumberFromAbbreviation("Sun")).toEqual(7);
});

test("getDayOfWeekNumberFromAbbreviation with unknown week of day", () => {
	expect(() => {
		getDayOfWeekNumberFromAbbreviation("Mo");
	}).toThrowError();
});
