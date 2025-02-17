import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfWeek } from "./endOfWeek.js";

test("PlainDateTime", () => {
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-07T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-02T12:34:56.789123456"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-08T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-06T23:59:59.999999999"));
	expect(
		endOfWeek(Temporal.PlainDateTime.from("2024-01-07T12:34:56.789123456"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-13T23:59:59.999999999"));
});

test("PlainDate", () => {
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-07"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-01"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-02"), {
			firstDayOfWeek: 2,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-08"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-06"));
	expect(
		endOfWeek(Temporal.PlainDate.from("2024-01-07"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-13"));
});

test("invalid day of week", () => {
	expect(() => {
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 8 });
	}).toThrowError();
	expect(() => {
		endOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: -1 });
	}).toThrowError();
});
