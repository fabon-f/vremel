import { expect, test } from "vitest";

import { areIntervalsOverlapping } from "./areIntervalsOverlapping.js";

test("Instant", () => {
	const t1 = Temporal.Instant.from("2024-01-01T00:00:00Z");
	const t2 = Temporal.Instant.from("2024-01-02T00:00:00Z");
	const t3 = Temporal.Instant.from("2024-01-03T00:00:00Z");
	const t4 = Temporal.Instant.from("2024-01-04T00:00:00Z");

	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t3,
			},
			{
				start: t2,
				end: t4,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t4,
			},
			{
				start: t2,
				end: t3,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t2,
			},
			{
				start: t3,
				end: t4,
			},
		),
	).toEqual(false);
});

test("ZonedDateTime", () => {
	const t1 = Temporal.ZonedDateTime.from("2024-01-01T09:00:00+09:00[Asia/Tokyo]");
	const t2 = Temporal.ZonedDateTime.from("2024-01-01T01:00:00+00:00[Europe/London]");
	const t3 = Temporal.ZonedDateTime.from("2024-01-03T00:00:00+00:00[Europe/London]");
	const t4 = Temporal.ZonedDateTime.from("2024-01-04T00:00:00+00:00[Europe/London]");

	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t3,
			},
			{
				start: t2,
				end: t4,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t4,
			},
			{
				start: t2,
				end: t3,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t2,
			},
			{
				start: t3,
				end: t4,
			},
		),
	).toEqual(false);
});

test("PlainDate", () => {
	const t1 = Temporal.PlainDate.from("2024-01-01");
	const t2 = Temporal.PlainDate.from("2024-01-02");
	const t3 = Temporal.PlainDate.from("2024-01-03");
	const t4 = Temporal.PlainDate.from("2024-01-04");

	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t3,
			},
			{
				start: t2,
				end: t4,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t4,
			},
			{
				start: t2,
				end: t3,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t2,
			},
			{
				start: t3,
				end: t4,
			},
		),
	).toEqual(false);
});

test("PlainTime", () => {
	const t1 = Temporal.PlainTime.from("00:00:00");
	const t2 = Temporal.PlainTime.from("01:00:00");
	const t3 = Temporal.PlainTime.from("02:00:00");
	const t4 = Temporal.PlainTime.from("03:00:00");

	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t3,
			},
			{
				start: t2,
				end: t4,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t4,
			},
			{
				start: t2,
				end: t3,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t2,
			},
			{
				start: t3,
				end: t4,
			},
		),
	).toEqual(false);
});

test("PlainDateTime", () => {
	const t1 = Temporal.PlainDateTime.from("2024-01-01T00:00:00");
	const t2 = Temporal.PlainDateTime.from("2024-01-02T00:00:00");
	const t3 = Temporal.PlainDateTime.from("2024-01-03T00:00:00");
	const t4 = Temporal.PlainDateTime.from("2024-01-04T00:00:00");

	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t3,
			},
			{
				start: t2,
				end: t4,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t4,
			},
			{
				start: t2,
				end: t3,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t2,
			},
			{
				start: t3,
				end: t4,
			},
		),
	).toEqual(false);
});

test("PlainYearMonth", () => {
	const t1 = Temporal.PlainYearMonth.from("2024-01");
	const t2 = Temporal.PlainYearMonth.from("2024-02");
	const t3 = Temporal.PlainYearMonth.from("2024-03");
	const t4 = Temporal.PlainYearMonth.from("2024-04");

	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t3,
			},
			{
				start: t2,
				end: t4,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t4,
			},
			{
				start: t2,
				end: t3,
			},
		),
	).toEqual(true);
	expect(
		areIntervalsOverlapping(
			{
				start: t1,
				end: t2,
			},
			{
				start: t3,
				end: t4,
			},
		),
	).toEqual(false);
});

test("`inclusive` option", () => {
	const i1 = {
		start: Temporal.Instant.from("2024-01-01T00:00:00Z"),
		end: Temporal.Instant.from("2024-01-02T00:00:00Z"),
	};
	const i2 = {
		start: Temporal.Instant.from("2024-01-02T00:00:00Z"),
		end: Temporal.Instant.from("2024-01-03T00:00:00Z"),
	};
	expect(areIntervalsOverlapping(i1, i2)).toEqual(true);
	expect(areIntervalsOverlapping(i1, i2, { inclusive: true })).toEqual(true);
	expect(areIntervalsOverlapping(i1, i2, { inclusive: false })).toEqual(false);
});
