import { expect, test } from "vitest";

import { endOfSecond } from "./endOfSecond.js";

test("PlainDateTime", () => {
	expect(
		endOfSecond(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-01T12:34:56.999999999"));
});

test("PlainTime", () => {
	expect(endOfSecond(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:34:56.999999999"),
	);
});

test("ZonedDateTime", () => {
	expect(
		endOfSecond(
			Temporal.PlainDateTime.from(
				"2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]",
			),
		),
	).toEqual(
		Temporal.PlainDateTime.from(
			"2024-01-01T12:34:56.999999999+09:00[Asia/Tokyo]",
		),
	);
});
