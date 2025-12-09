import { Temporal as Temporal2 } from "@js-temporal/polyfill";
import { Temporal as Temporal1 } from "temporal-polyfill";
import { expect, test } from "vitest";

import {
	getConstructor,
	isInstant,
	isInstantConstructor,
	isPlainDate,
	isPlainDateConstructor,
	isPlainDateTime,
	isPlainDateTimeConstructor,
	isPlainMonthDay,
	isPlainMonthDayConstructor,
	isPlainTime,
	isPlainTimeConstructor,
	isPlainYearMonth,
	isPlainYearMonthConstructor,
	isZonedDateTime,
	isZonedDateTimeConstructor,
} from "./type-utils.js";
import type { Temporal } from "./types.js";

function createTypes(temporal: any) {
	return [
		temporal.Now.instant(),
		temporal.Now.zonedDateTimeISO(),
		temporal.Now.plainDateTimeISO(),
		temporal.Now.plainDateISO(),
		temporal.Now.plainTimeISO(),
		temporal.Now.plainDateISO().toPlainYearMonth(),
		temporal.Now.plainDateISO().toPlainMonthDay(),
		temporal.Duration.from({ seconds: 20 }),
	];
}

function constructors(temporal: any) {
	return [
		temporal.Instant,
		temporal.ZonedDateTime,
		temporal.PlainDate,
		temporal.PlainTime,
		temporal.PlainDateTime,
		temporal.PlainYearMonth,
		temporal.PlainMonthDay,
	];
}

test("isInstant", () => {
	const expected = [true, false, false, false, false, false, false, false];
	expect(createTypes(Temporal1).map((v) => isInstant(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isInstant(v))).toEqual(expected);
});

test("isZonedDateTime", () => {
	const expected = [false, true, false, false, false, false, false, false];
	expect(createTypes(Temporal1).map((v) => isZonedDateTime(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isZonedDateTime(v))).toEqual(expected);
});

test("isPlainDateTime", () => {
	const expected = [false, false, true, false, false, false, false, false];
	expect(createTypes(Temporal1).map((v) => isPlainDateTime(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isPlainDateTime(v))).toEqual(expected);
});

test("isPlainDate", () => {
	const expected = [false, false, false, true, false, false, false, false];
	expect(createTypes(Temporal1).map((v) => isPlainDate(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isPlainDate(v))).toEqual(expected);
});

test("isPlainTime", () => {
	const expected = [false, false, false, false, true, false, false, false];
	expect(createTypes(Temporal1).map((v) => isPlainTime(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isPlainTime(v))).toEqual(expected);
});

test("isPlainYearMonth", () => {
	const expected = [false, false, false, false, false, true, false, false];
	expect(createTypes(Temporal1).map((v) => isPlainYearMonth(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isPlainYearMonth(v))).toEqual(expected);
});

test("isPlainMonthDay", () => {
	const expected = [false, false, false, false, false, false, true, false];
	expect(createTypes(Temporal1).map((v) => isPlainMonthDay(v))).toEqual(expected);
	expect(createTypes(Temporal2).map((v) => isPlainMonthDay(v))).toEqual(expected);
});

test("isInstantConstructor", () => {
	const expected = [true, false, false, false, false, false, false];
	expect(constructors(Temporal1).map((c) => isInstantConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isInstantConstructor(c))).toEqual(expected);
});

test("isZonedDateTimeConstructor", () => {
	const expected = [false, true, false, false, false, false, false];
	expect(constructors(Temporal1).map((c) => isZonedDateTimeConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isZonedDateTimeConstructor(c))).toEqual(expected);
});

test("isPlainDateConstructor", () => {
	const expected = [false, false, true, false, false, false, false];
	expect(constructors(Temporal1).map((c) => isPlainDateConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isPlainDateConstructor(c))).toEqual(expected);
});

test("isPlainTimeConstructor", () => {
	const expected = [false, false, false, true, false, false, false];
	expect(constructors(Temporal1).map((c) => isPlainTimeConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isPlainTimeConstructor(c))).toEqual(expected);
});

test("isPlainDateTimeConstructor", () => {
	const expected = [false, false, false, false, true, false, false];
	expect(constructors(Temporal1).map((c) => isPlainDateTimeConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isPlainDateTimeConstructor(c))).toEqual(expected);
});

test("isPlainYearMonthConstructor", () => {
	const expected = [false, false, false, false, false, true, false];
	expect(constructors(Temporal1).map((c) => isPlainYearMonthConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isPlainYearMonthConstructor(c))).toEqual(expected);
});

test("isPlainMonthDayConstructor", () => {
	const expected = [false, false, false, false, false, false, true];
	expect(constructors(Temporal1).map((c) => isPlainMonthDayConstructor(c))).toEqual(expected);
	expect(constructors(Temporal2).map((c) => isPlainMonthDayConstructor(c))).toEqual(expected);
});

test("getConstructor", () => {
	const createExpected = (Temporal: any) => [
		Temporal.Instant,
		Temporal.ZonedDateTime,
		Temporal.PlainDateTime,
		Temporal.PlainDate,
		Temporal.PlainTime,
		Temporal.PlainYearMonth,
		Temporal.PlainMonthDay,
		Temporal.Duration,
	];
	expect(createTypes(Temporal1).map((v) => getConstructor(v))).toEqual(createExpected(Temporal1));
	expect(createTypes(Temporal2).map((v) => getConstructor(v))).toEqual(createExpected(Temporal2));
});

test("type compatibility", () => {
	const testFunc = (
		_1: Temporal.Instant,
		_2: Temporal.ZonedDateTime,
		_3: Temporal.PlainDateTime,
		_4: Temporal.PlainDate,
		_5: Temporal.PlainTime,
		_6: Temporal.PlainYearMonth,
		_7: Temporal.PlainMonthDay,
		_8: Temporal.Duration,
	) => {};
	testFunc(
		Temporal1.Now.instant(),
		Temporal1.Now.zonedDateTimeISO(),
		Temporal1.Now.plainDateTimeISO(),
		Temporal1.Now.plainDateISO(),
		Temporal1.Now.plainTimeISO(),
		Temporal1.Now.plainDateISO().toPlainYearMonth(),
		Temporal1.Now.plainDateISO().toPlainMonthDay(),
		Temporal1.Duration.from({ years: 2 }),
	);
	testFunc(
		Temporal2.Now.instant(),
		Temporal2.Now.zonedDateTimeISO(),
		Temporal2.Now.plainDateTimeISO(),
		Temporal2.Now.plainDateISO(),
		Temporal2.Now.plainTimeISO(),
		Temporal2.Now.plainDateISO().toPlainYearMonth(),
		Temporal2.Now.plainDateISO().toPlainMonthDay(),
		Temporal1.Duration.from({ years: 2 }),
	);
});
