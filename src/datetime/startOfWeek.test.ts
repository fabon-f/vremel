import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { startOfWeek } from "./startOfWeek.js";

test("PlainDateTime", () => {
	expect(
		startOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
	expect(
		startOfWeek(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"), {
			firstDayOfWeek: 7,
		}),
	).toEqual(Temporal.PlainDateTime.from("2023-12-31T00:00:00"));
	expect(
		startOfWeek(Temporal.PlainDateTime.from("2024-01-07T12:34:56.789123456"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T00:00:00"));
});

test("PlainDate", () => {
	expect(
		startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 1 }),
	).toEqual(Temporal.PlainDate.from("2024-01-01"));
	expect(
		startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 7 }),
	).toEqual(Temporal.PlainDate.from("2023-12-31"));
	expect(
		startOfWeek(Temporal.PlainDate.from("2024-01-07"), {
			firstDayOfWeek: 1,
		}),
	).toEqual(Temporal.PlainDate.from("2024-01-01"));
});

test("invalid day of week", () => {
	expect(() => {
		startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: 8 });
	}).toThrowError();
	expect(() => {
		startOfWeek(Temporal.PlainDate.from("2024-01-01"), { firstDayOfWeek: -1 });
	}).toThrowError();
});
