import { expect, test } from "vitest";

import { fromRfc7231 } from "./fromRfc7231.js";

test("Instant", () => {
	expect(
		fromRfc7231("Fri, 07 Jun 2024 01:23:45 GMT", Temporal.Instant),
	).toEqual(Temporal.Instant.from("2024-06-07T01:23:45Z"));
});

test("PlainDateTime", () => {
	expect(
		fromRfc7231("Fri, 07 Jun 2024 01:23:45 GMT", Temporal.PlainDateTime),
	).toEqual(Temporal.PlainDateTime.from("2024-06-07T01:23:45"));
});

test("ZonedDateTime", () => {
	expect(
		fromRfc7231("Fri, 07 Jun 2024 01:23:45 GMT", Temporal.ZonedDateTime),
	).toEqual(Temporal.ZonedDateTime.from("2024-06-07T01:23:45+00:00[UTC]"));
});

test("wrong format", () => {
	expect(() => {
		fromRfc7231("Fri, 7 Jun 2024 01:23:45 GMT", Temporal.Instant);
	}).toThrowError();
});

test("wrong day of week", () => {
	expect(() => {
		fromRfc7231("Tue, 07 Jun 2024 01:23:45 GMT", Temporal.Instant);
	}).toThrowError(/Tue/);
	expect(() => {
		fromRfc7231("Tue, 07 Jun 2024 01:23:45 GMT", Temporal.PlainDateTime);
	}).toThrowError(/Tue/);
	expect(() => {
		fromRfc7231("Tue, 07 Jun 2024 01:23:45 GMT", Temporal.ZonedDateTime);
	}).toThrowError(/Tue/);
});

test("invalid day of week", () => {
	expect(() => {
		fromRfc7231("Mot, 07 Jun 2024 01:23:45 GMT", Temporal.Instant);
	}).toThrowError(/Mot/);
	expect(() => {
		fromRfc7231("Mot, 07 Jun 2024 01:23:45 GMT", Temporal.PlainDateTime);
	}).toThrowError(/Mot/);
	expect(() => {
		fromRfc7231("Mot, 07 Jun 2024 01:23:45 GMT", Temporal.ZonedDateTime);
	}).toThrowError(/Mot/);
});

test("invalid month", () => {
	expect(() => {
		fromRfc7231("Mon, 07 Jut 2024 01:23:45 GMT", Temporal.Instant);
	}).toThrowError(/Jut/);
	expect(() => {
		fromRfc7231("Mon, 07 Jut 2024 01:23:45 GMT", Temporal.PlainDateTime);
	}).toThrowError(/Jut/);
	expect(() => {
		fromRfc7231("Mon, 07 Jut 2024 01:23:45 GMT", Temporal.ZonedDateTime);
	}).toThrowError(/Jut/);
});

test.for([
	["Fri, 07 Jun 0824 01:23:45 GMT", "0824-06-07T01:23:45+00:00[UTC]"],
	["Fri, 07 Jun 0024 01:23:45 GMT", "0024-06-07T01:23:45+00:00[UTC]"],
	["Sat, 01 Jan 0000 01:23:45 GMT", "0000-01-01T01:23:45+00:00[UTC]"],
] as [string, string][])(
	"when year is less than 1000",
	([rfc7231, iso8601]) => {
		expect(fromRfc7231(rfc7231, Temporal.Instant)).toEqual(
			Temporal.Instant.from(iso8601),
		);
		expect(fromRfc7231(rfc7231, Temporal.PlainDateTime)).toEqual(
			Temporal.PlainDateTime.from(iso8601),
		);
		expect(fromRfc7231(rfc7231, Temporal.ZonedDateTime)).toEqual(
			Temporal.ZonedDateTime.from(iso8601),
		);
	},
);
