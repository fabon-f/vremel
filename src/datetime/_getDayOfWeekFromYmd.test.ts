import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { TimeZoneModifier } from "../_test/TimeZoneModifier.js";
import { getDayOfWeekFromYmd } from "./_getDayOfWeekFromYmd.js";

const zoneModifier = new TimeZoneModifier();

test("getDayOfWeekFromYmd", () => {
	expect(getDayOfWeekFromYmd(2024, 1, 1)).toEqual(1);
	expect(getDayOfWeekFromYmd(2024, 1, 2)).toEqual(2);
	expect(getDayOfWeekFromYmd(2024, 1, 3)).toEqual(3);
	expect(getDayOfWeekFromYmd(2024, 1, 4)).toEqual(4);
	expect(getDayOfWeekFromYmd(2024, 1, 5)).toEqual(5);
	expect(getDayOfWeekFromYmd(2024, 1, 6)).toEqual(6);
	expect(getDayOfWeekFromYmd(2024, 1, 7)).toEqual(7);
});

test("result of getDayOfWeekFromYmd should match to Temporal's dayOfWeek", () => {
	expect(getDayOfWeekFromYmd(2024, 1, 7)).toEqual(
		Temporal.PlainDate.from("2024-01-07").dayOfWeek,
	);
});

test("invalid date", () => {
	expect(() => {
		getDayOfWeekFromYmd(2024, 1, 366);
	}).toThrowError();
	expect(() => {
		getDayOfWeekFromYmd(2023, 2, 29);
	}).toThrowError();
});

test("getDayOfWeekFromYmd with a day which doesn't exist in local time zone", () => {
	zoneModifier.set("Pacific/Apia");
	// 2011/12/30 was skipped in Pacific/Apia due to offset change (UTC-11:00 -> UTC+13:00)
	expect(getDayOfWeekFromYmd(2011, 12, 30)).toEqual(5);
	zoneModifier.restore();
});
