import { expect, test } from "vitest";

import { startOfSecond } from "./startOfSecond.js";

test("PlainDateTime", () => {
	expect(
		startOfSecond(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:34:56"));
});

test("PlainTime", () => {
	expect(startOfSecond(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:34:56"),
	);
});

test("ZonedDateTime", () => {
	expect(
		startOfSecond(
			Temporal.ZonedDateTime.from(
				"2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from("2024-01-01T12:34:56+09:00[Asia/Tokyo]"),
	);
});
