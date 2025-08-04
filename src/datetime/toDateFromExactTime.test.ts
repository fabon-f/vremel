import { UTCDate } from "@date-fns/utc";
import { expect, test } from "vitest";

import { toDateFromExactTime } from "./toDateFromExactTime.js";

test("Instant", () => {
	expect(
		toDateFromExactTime(Temporal.Instant.from("2024-01-01T01:23:45.678Z")),
	).toStrictEqual(new Date("2024-01-01T01:23:45.678Z"));
});

test("units smaller than millisecond", () => {
	expect(
		toDateFromExactTime(Temporal.Instant.from("2024-01-01T00:00:00.0009Z")),
	).toStrictEqual(new Date("2024-01-01T00:00:00Z"));
});

test("ZonedDateTime", () => {
	expect(
		toDateFromExactTime(
			Temporal.ZonedDateTime.from("2024-01-01T00:00:00+09:00[Asia/Tokyo]"),
		),
	).toStrictEqual(new Date("2023-12-31T15:00:00Z"));
});

test("DateConstructor option", () => {
	const result = toDateFromExactTime(
		Temporal.ZonedDateTime.from("2024-01-01T00:00:00+09:00[Asia/Tokyo]"),
		UTCDate,
	);
	expect(result).toStrictEqual(new UTCDate("2023-12-31T15:00:00Z"));
});
