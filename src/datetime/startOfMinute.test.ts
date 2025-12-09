import { expect, test } from "vitest";

import { startOfMinute } from "./startOfMinute.js";

test("PlainDateTime", () => {
	expect(startOfMinute(Temporal.PlainDateTime.from("2024-01-01T12:34:56.789123456"))).toEqual(
		Temporal.PlainDateTime.from("2024-01-01T12:34:00"),
	);
});

test("PlainTime", () => {
	expect(startOfMinute(Temporal.PlainTime.from("12:34:56.789123456"))).toEqual(
		Temporal.PlainTime.from("12:34:00"),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		startOfMinute(Temporal.ZonedDateTime.from("1972-01-07T00:44:59+00:00[Africa/Monrovia]")),
	).toEqual(Temporal.ZonedDateTime.from("1972-01-07T00:44:30+00:00[Africa/Monrovia]"));
});

test("ZonedDateTime and backward transition", () => {
	expect(
		startOfMinute(
			// TODO: create ZonedDateTime directly when https://github.com/tc39/proposal-temporal/issues/3099 is fixed in polyfills
			Temporal.Instant.from("1952-10-15T23:59:50-11:20:00").toZonedDateTimeISO("Pacific/Niue"),
		),
	).toEqual(Temporal.ZonedDateTime.from("1952-10-15T23:59:00-11:19:40[Pacific/Niue]"));
});
