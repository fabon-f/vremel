import { expect, test } from "vitest";

import { endOfMinute } from "./endOfMinute.js";

test("PlainDateTime", () => {
	expect(endOfMinute(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"))).toEqual(
		Temporal.PlainDateTime.from("2024-01-01T12:34:59.999999999"),
	);
});

test("PlainTime", () => {
	expect(endOfMinute(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:34:59.999999999"),
	);
});

test("ZonedDateTime without offset transition", () => {
	expect(
		endOfMinute(Temporal.ZonedDateTime.from("2024-01-01T12:34:56.789123456+09:00[Asia/Tokyo]")),
	).toEqual(Temporal.ZonedDateTime.from("2024-01-01T12:34:59.999999999+09:00[Asia/Tokyo]"));
});

test("ZonedDateTime and forward transition", () => {
	expect(
		endOfMinute(Temporal.ZonedDateTime.from("1911-12-31T23:23:00-00:37[Europe/Lisbon]")),
	).toEqual(Temporal.ZonedDateTime.from("1911-12-31T23:23:14.999999999-00:37[Europe/Lisbon]"));
});

test("ZonedDateTime and backward transition", () => {
	expect(
		endOfMinute(Temporal.ZonedDateTime.from("1952-10-15T23:59:00-11:19:40[Pacific/Niue]")),
	).toEqual(
		// TODO: create ZonedDateTime directly when https://github.com/tc39/proposal-temporal/issues/3099 is fixed in polyfills
		Temporal.Instant.from("1952-10-15T23:59:59.999999999-11:20:00").toZonedDateTimeISO(
			"Pacific/Niue",
		),
	);
});
