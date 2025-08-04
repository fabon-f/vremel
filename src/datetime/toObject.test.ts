import { expect, test } from "vitest";

import {
	type PlainDateLike,
	type PlainDateTimeLike,
	type PlainMonthDayLike,
	type PlainYearMonthLike,
	toObject,
	type ZonedDateTimeLike,
} from "./toObject.js";

test.for([
	[
		"ZonedDateTime",
		"2025-01-02T03:04:05.006007008+09:00[Asia/Tokyo]",
		{
			era: undefined,
			eraYear: undefined,
			year: 2025,
			month: 1,
			monthCode: "M01",
			day: 2,
			hour: 3,
			minute: 4,
			second: 5,
			millisecond: 6,
			microsecond: 7,
			nanosecond: 8,
			offset: "+09:00",
			timeZone: "Asia/Tokyo",
			calendar: "iso8601",
		},
	],
	[
		"ZonedDateTime with sub-minute offset",
		"1970-01-02T03:04:05.006007008-00:44:30[Africa/Monrovia]",
		{
			era: undefined,
			eraYear: undefined,
			year: 1970,
			month: 1,
			monthCode: "M01",
			day: 2,
			hour: 3,
			minute: 4,
			second: 5,
			millisecond: 6,
			microsecond: 7,
			nanosecond: 8,
			offset: "-00:44:30",
			timeZone: "Africa/Monrovia",
			calendar: "iso8601",
		},
	],
	[
		"ZonedDateTime with lunisolar calendar",
		"2024-02-20T02:03:04.005006007-05:00[America/New_York][u-ca=hebrew]",
		{
			era: undefined,
			eraYear: undefined,
			year: 5784,
			month: 6,
			monthCode: "M05L",
			day: 11,
			hour: 2,
			minute: 3,
			second: 4,
			millisecond: 5,
			microsecond: 6,
			nanosecond: 7,
			offset: "-05:00",
			timeZone: "America/New_York",
			calendar: "hebrew",
		},
	],
	[
		"ZonedDateTime with calendar which has eras",
		"2025-01-02T03:04:05.006007008+09:00[Asia/Tokyo][u-ca=japanese]",
		{
			era: "reiwa",
			eraYear: 7,
			year: 2025,
			month: 1,
			monthCode: "M01",
			day: 2,
			hour: 3,
			minute: 4,
			second: 5,
			millisecond: 6,
			microsecond: 7,
			nanosecond: 8,
			offset: "+09:00",
			timeZone: "Asia/Tokyo",
			calendar: "japanese",
		},
	],
] as [string, string, ZonedDateTimeLike][])("%s", ([, str, expected]) => {
	const original = Temporal.ZonedDateTime.from(str);
	const object = toObject(original);
	expect(object).toEqual(expected);
	expect(
		Temporal.ZonedDateTime.from(object, {
			disambiguation: "reject",
			offset: "reject",
			overflow: "reject",
		}),
	).toEqual(original);
});

test.for([
	[
		"PlainDateTime",
		"2025-01-02T03:04:05.006007008",
		{
			era: undefined,
			eraYear: undefined,
			year: 2025,
			month: 1,
			monthCode: "M01",
			day: 2,
			hour: 3,
			minute: 4,
			second: 5,
			millisecond: 6,
			microsecond: 7,
			nanosecond: 8,
			calendar: "iso8601",
		},
	],
	[
		"PlainDateTime with lunisolar calendar",
		"2024-02-20T02:03:04.005006007[u-ca=hebrew]",
		{
			era: undefined,
			eraYear: undefined,
			year: 5784,
			month: 6,
			monthCode: "M05L",
			day: 11,
			hour: 2,
			minute: 3,
			second: 4,
			millisecond: 5,
			microsecond: 6,
			nanosecond: 7,
			calendar: "hebrew",
		},
	],
	[
		"PlainDateTime with calendar which has eras",
		"2025-01-02T03:04:05.006007008[u-ca=japanese]",
		{
			era: "reiwa",
			eraYear: 7,
			year: 2025,
			month: 1,
			monthCode: "M01",
			day: 2,
			hour: 3,
			minute: 4,
			second: 5,
			millisecond: 6,
			microsecond: 7,
			nanosecond: 8,
			calendar: "japanese",
		},
	],
] as [string, string, PlainDateTimeLike][])("%s", ([, str, expected]) => {
	const original = Temporal.PlainDateTime.from(str);
	const object = toObject(original);
	expect(object).toEqual(expected);
	expect(Temporal.PlainDateTime.from(object, { overflow: "reject" })).toEqual(
		original,
	);
});

test.for([
	[
		"PlainDate",
		"2025-01-02",
		{
			era: undefined,
			eraYear: undefined,
			year: 2025,
			month: 1,
			monthCode: "M01",
			day: 2,
			calendar: "iso8601",
		},
	],
	[
		"PlainDate with lunisolar calendar",
		"2024-02-20[u-ca=hebrew]",
		{
			era: undefined,
			eraYear: undefined,
			year: 5784,
			month: 6,
			monthCode: "M05L",
			day: 11,
			calendar: "hebrew",
		},
	],
	[
		"PlainDate with calendar which has eras",
		"2025-01-02[u-ca=japanese]",
		{
			era: "reiwa",
			eraYear: 7,
			year: 2025,
			month: 1,
			monthCode: "M01",
			day: 2,
			calendar: "japanese",
		},
	],
] as [string, string, PlainDateLike][])("%s", ([, str, expected]) => {
	const original = Temporal.PlainDate.from(str);
	const object = toObject(original);
	expect(object).toEqual(expected);
	expect(Temporal.PlainDate.from(object, { overflow: "reject" })).toEqual(
		original,
	);
});

test("PlainTime", () => {
	const original = Temporal.PlainTime.from("01:02:03.004005006");
	const object = toObject(original);
	expect(object).toEqual({
		hour: 1,
		minute: 2,
		second: 3,
		millisecond: 4,
		microsecond: 5,
		nanosecond: 6,
	});
	expect(Temporal.PlainTime.from(object, { overflow: "reject" })).toEqual(
		original,
	);
});

test.for([
	[
		"PlainYearMonth",
		"2025-01",
		{
			era: undefined,
			eraYear: undefined,
			year: 2025,
			month: 1,
			monthCode: "M01",
			calendar: "iso8601",
		},
	],
	[
		"PlainYearMonth with lunisolar calendar",
		"2024-02-20[u-ca=hebrew]",
		{
			era: undefined,
			eraYear: undefined,
			year: 5784,
			month: 6,
			monthCode: "M05L",
			calendar: "hebrew",
		},
	],
	[
		"PlainYearMonth with calendar which has eras",
		"2025-01-01[u-ca=japanese]",
		{
			era: "reiwa",
			eraYear: 7,
			year: 2025,
			month: 1,
			monthCode: "M01",
			calendar: "japanese",
		},
	],
] as [string, string, PlainYearMonthLike][])("%s", ([, str, expected]) => {
	const original = Temporal.PlainYearMonth.from(str);
	const object = toObject(original);
	expect(object).toEqual(expected);
	expect(Temporal.PlainYearMonth.from(object, { overflow: "reject" })).toEqual(
		original,
	);
});

test.for([
	["PlainMonthDay", "01-02", { monthCode: "M01", day: 2, calendar: "iso8601" }],
	[
		"PlainMonthDay with lunisolar calendar",
		"2024-02-20[u-ca=hebrew]",
		{ monthCode: "M05L", day: 11, calendar: "hebrew" },
	],
] as [string, string, PlainMonthDayLike][])("%s", ([, str, expected]) => {
	const original = Temporal.PlainMonthDay.from(str);
	const object = toObject(original);
	expect(object).toEqual(expected);
	expect(Temporal.PlainMonthDay.from(object, { overflow: "reject" })).toEqual(
		original,
	);
});
