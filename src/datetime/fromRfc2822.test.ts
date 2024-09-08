import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { fromRfc2822 } from "./fromRfc2822.js";

test("PlainDateTime", () => {
	expect(
		fromRfc2822("07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("2024-06-07T01:23:45"));
});

test("Instant", () => {
	expect(fromRfc2822("07 Jun 2024 01:23:45 +0900", Temporal.Instant)).toEqual(
		Temporal.Instant.from("2024-06-07T01:23:45+09:00"),
	);
});

test("ZonedDateTime", () => {
	expect(
		fromRfc2822("07 Jun 2024 01:23:45 +0900", Temporal.ZonedDateTime),
	).toEqual(Temporal.ZonedDateTime.from("2024-06-07T01:23:45+09:00[+09:00]"));
});

test("day of week", () => {
	expect(
		fromRfc2822("Fri, 07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("2024-06-07T01:23:45"));
});

test("wrong day of week", () => {
	expect(() => {
		fromRfc2822("Tue, 07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime);
	}).toThrowError(/Wrong day of week/);
});

test("string without second", () => {
	expect(
		fromRfc2822("07 Jun 2024 01:23 +0900", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("2024-06-07T01:23:00"));
});

test("obsolete 2-digit year", () => {
	expect(
		fromRfc2822("07 Jun 24 01:23:45 +0900", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("2024-06-07T01:23:45"));
	expect(
		fromRfc2822("07 Jun 56 01:23:45 +0900", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("1956-06-07T01:23:45"));
});

test.each([
	["07 Jun 2024 01:23:45 UT"],
	["07 Jun 2024 01:23:45 GMT"],
	["07 Jun 2024 01:23:45 Z"],
	["07 Jun 2024 01:23:45 z"],
])("time zones with zero offset", (rfc2822) => {
	expect(fromRfc2822(rfc2822, Temporal.Instant)).toEqual(
		Temporal.Instant.from("2024-06-07T01:23:45+00:00"),
	);
	expect(fromRfc2822(rfc2822, Temporal.ZonedDateTime)).toEqual(
		Temporal.ZonedDateTime.from("2024-06-07T01:23:45+00:00[+00:00]"),
	);
});

test("time zone -0000", () => {
	expect(
		fromRfc2822("07 Jun 24 01:23:45 -0000", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("2024-06-07T01:23:45"));
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 -0000", Temporal.Instant);
	}).toThrowError();
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 -0000", Temporal.ZonedDateTime);
	}).toThrowError();
});

test("militatry time zone", () => {
	expect(fromRfc2822("07 Jun 24 01:23:45 A", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 A", Temporal.Instant);
	}).toThrowError();
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 A", Temporal.ZonedDateTime);
	}).toThrowError();
});

test.each([
	["07 Jun 2024 01:23:45 EST", "2024-06-07T01:23:45-05:00[-05:00]"],
	["07 Jun 2024 01:23:45 EDT", "2024-06-07T01:23:45-04:00[-04:00]"],
	["07 Jun 2024 01:23:45 CST", "2024-06-07T01:23:45-06:00[-06:00]"],
	["07 Jun 2024 01:23:45 CDT", "2024-06-07T01:23:45-05:00[-05:00]"],
	["07 Jun 2024 01:23:45 MST", "2024-06-07T01:23:45-07:00[-07:00]"],
	["07 Jun 2024 01:23:45 MDT", "2024-06-07T01:23:45-06:00[-06:00]"],
	["07 Jun 2024 01:23:45 PST", "2024-06-07T01:23:45-08:00[-08:00]"],
	["07 Jun 2024 01:23:45 PDT", "2024-06-07T01:23:45-07:00[-07:00]"],
])("North American time zones", (rfc2822, iso8601) => {
	expect(fromRfc2822(rfc2822, Temporal.Instant)).toEqual(
		Temporal.Instant.from(iso8601),
	);
	expect(fromRfc2822(rfc2822, Temporal.ZonedDateTime)).toEqual(
		Temporal.ZonedDateTime.from(iso8601),
	);
});

test("comment", () => {
	expect(
		fromRfc2822(
			"(day of week skipped)07 Jun 2024 01:23:45 (comment\\()(comment2) +0000 (GMT! (nested \\(comment))",
			Temporal.Instant,
		),
	).toEqual(Temporal.Instant.from("2024-06-07T01:23:45Z"));
});

test("unbalanced comment", () => {
	expect(() =>
		fromRfc2822("07 Jun 2024 01:23:45 +0000 (comment", Temporal.Instant),
	).toThrowError();
	expect(() =>
		fromRfc2822("07 Jun 2024 (comment)) 01:23:45 +0000", Temporal.Instant),
	).toThrowError();
});

test("invalid day of week", () => {
	expect(() => {
		fromRfc2822("Mot, 07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime);
	}).toThrowError(/Mot/);
});

test("invalid month name", () => {
	expect(() => {
		fromRfc2822("Mon, 01 Jat 2024 01:23:45 +0900", Temporal.PlainDateTime);
	}).toThrowError(/Jat/);
});
