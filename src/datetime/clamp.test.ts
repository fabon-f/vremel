import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { clamp } from "./clamp.js";

test("Instant", () => {
	const i = {
		start: Temporal.Instant.from("2024-01-01T00:00:00Z"),
		end: Temporal.Instant.from("2024-01-04T00:00:00Z"),
	};
	expect(clamp(Temporal.Instant.from("2023-12-31T00:00:00Z"), i)).toEqual(
		i.start,
	);
	expect(clamp(Temporal.Instant.from("2024-01-02T00:00:00Z"), i)).toEqual(
		Temporal.Instant.from("2024-01-02T00:00:00Z"),
	);
	expect(clamp(Temporal.Instant.from("2024-01-05T00:00:00Z"), i)).toEqual(
		i.end,
	);
	expect(clamp(i.start, i)).toEqual(i.start);
	expect(clamp(i.end, i)).toEqual(i.end);
});

test("ZonedDateTime", () => {
	const i = {
		start: Temporal.ZonedDateTime.from("2024-01-01T00:00:00Z[Europe/London]"),
		end: Temporal.ZonedDateTime.from("2024-01-04T00:00:00Z[Europe/London]"),
	};
	expect(
		clamp(
			Temporal.ZonedDateTime.from("2023-12-31T00:00:00Z[Europe/London]"),
			i,
		),
	).toEqual(i.start);
	expect(
		clamp(
			Temporal.ZonedDateTime.from("2024-01-02T00:00:00Z[Europe/London]"),
			i,
		),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-02T00:00:00Z[Europe/London]"));
	expect(
		clamp(
			Temporal.ZonedDateTime.from("2024-01-05T00:00:00Z[Europe/London]"),
			i,
		),
	).toEqual(i.end);
	// if the given ZonedDateTime represents same exact time with `i.start` or `i.end`,
	// the given ZonedDateTime (not `i.start` nor `i.end`) should be returned
	expect(
		clamp(
			Temporal.ZonedDateTime.from("2024-01-01T09:00:00+09:00[Asia/Tokyo]"),
			i,
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-01-01T09:00:00+09:00[Asia/Tokyo]"),
	);
	expect(clamp(i.start, i)).toEqual(i.start);
	expect(clamp(i.end, i)).toEqual(i.end);
});

test("PlainDate", () => {
	const i = {
		start: Temporal.PlainDate.from("2024-01-01"),
		end: Temporal.PlainDate.from("2024-01-04"),
	};
	expect(clamp(Temporal.PlainDate.from("2023-12-31"), i)).toEqual(i.start);
	expect(clamp(Temporal.PlainDate.from("2024-01-02"), i)).toEqual(
		Temporal.PlainDate.from("2024-01-02"),
	);
	expect(clamp(Temporal.PlainDate.from("2024-01-05"), i)).toEqual(i.end);
	expect(clamp(i.start, i)).toEqual(i.start);
	expect(clamp(i.end, i)).toEqual(i.end);
});

test("PlainTime", () => {
	const i = {
		start: Temporal.PlainTime.from("06:00:00"),
		end: Temporal.PlainTime.from("18:00:00"),
	};
	expect(clamp(Temporal.PlainTime.from("03:00:00"), i)).toEqual(i.start);
	expect(clamp(Temporal.PlainTime.from("12:00:00"), i)).toEqual(
		Temporal.PlainTime.from("12:00:00"),
	);
	expect(clamp(Temporal.PlainTime.from("21:00:00"), i)).toEqual(i.end);
	expect(clamp(i.start, i)).toEqual(i.start);
	expect(clamp(i.end, i)).toEqual(i.end);
});

test("PlainDateTime", () => {
	const i = {
		start: Temporal.PlainDateTime.from("2024-01-01T00:00:00"),
		end: Temporal.PlainDateTime.from("2024-01-04T00:00:00"),
	};
	expect(clamp(Temporal.PlainDateTime.from("2023-12-31T00:00:00"), i)).toEqual(
		i.start,
	);
	expect(clamp(Temporal.PlainDateTime.from("2024-01-02T00:00:00"), i)).toEqual(
		Temporal.PlainDateTime.from("2024-01-02T00:00:00"),
	);
	expect(clamp(Temporal.PlainDateTime.from("2024-01-05T00:00:00"), i)).toEqual(
		i.end,
	);
	expect(clamp(i.start, i)).toEqual(i.start);
	expect(clamp(i.end, i)).toEqual(i.end);
});

test("PlainYearMonth", () => {
	const i = {
		start: Temporal.PlainYearMonth.from("2024-01"),
		end: Temporal.PlainYearMonth.from("2024-04"),
	};
	expect(clamp(Temporal.PlainYearMonth.from("2023-12"), i)).toEqual(i.start);
	expect(clamp(Temporal.PlainYearMonth.from("2024-03"), i)).toEqual(
		Temporal.PlainYearMonth.from("2024-03"),
	);
	expect(clamp(Temporal.PlainYearMonth.from("2024-05"), i)).toEqual(i.end);
	expect(clamp(i.start, i)).toEqual(i.start);
	expect(clamp(i.end, i)).toEqual(i.end);
});
