import { expect, test } from "vitest";

import { formatRfc7231 } from "./formatRfc7231.js";

test("ZonedDateTime", () => {
	expect(
		formatRfc7231(
			Temporal.ZonedDateTime.from("2024-06-07T10:23:45+09:00[Asia/Tokyo]"),
		),
	).toEqual("Fri, 07 Jun 2024 01:23:45 GMT");
	expect(
		formatRfc7231(
			Temporal.ZonedDateTime.from(
				"2024-06-07T10:23:45+09:00[Asia/Tokyo][u-ca=hebrew]",
			),
		),
	).toEqual("Fri, 07 Jun 2024 01:23:45 GMT");
});

test("Instant", () => {
	expect(formatRfc7231(Temporal.Instant.from("2024-06-07T01:23:45Z"))).toEqual(
		"Fri, 07 Jun 2024 01:23:45 GMT",
	);
});

test("fractional seconds", () => {
	// units smaller than second is ignored
	expect(
		formatRfc7231(Temporal.Instant.from("2024-06-07T01:23:45.123456789Z")),
	).toEqual("Fri, 07 Jun 2024 01:23:45 GMT");
	expect(
		formatRfc7231(Temporal.Instant.from("1968-06-07T01:23:45.123456789Z")),
	).toEqual("Fri, 07 Jun 1968 01:23:45 GMT");
});

test("valid range of year", () => {
	expect(formatRfc7231(Temporal.Instant.from("0000-01-01T00:00:00Z"))).toEqual(
		"Sat, 01 Jan 0000 00:00:00 GMT",
	);
	expect(
		formatRfc7231(Temporal.ZonedDateTime.from("0000-01-01T00:00:00Z[UTC]")),
	).toEqual("Sat, 01 Jan 0000 00:00:00 GMT");
	expect(formatRfc7231(Temporal.Instant.from("9999-12-31T00:00:00Z"))).toEqual(
		"Fri, 31 Dec 9999 00:00:00 GMT",
	);
	expect(
		formatRfc7231(Temporal.ZonedDateTime.from("9999-12-31T00:00:00Z[UTC]")),
	).toEqual("Fri, 31 Dec 9999 00:00:00 GMT");
});

test("invalid range of year", () => {
	expect(() => {
		formatRfc7231(Temporal.Instant.from("-000001-12-31T23:59:59Z"));
	}).toThrow();
	expect(() => {
		formatRfc7231(Temporal.ZonedDateTime.from("-000001-12-31T23:59:59Z[UTC]"));
	}).toThrow();
	expect(() => {
		formatRfc7231(Temporal.Instant.from("-100000-01-01T00:00:00Z"));
	}).toThrow();
	expect(() => {
		formatRfc7231(Temporal.ZonedDateTime.from("-100000-01-01T00:00:00Z[UTC]"));
	}).toThrow();
	expect(() => {
		formatRfc7231(Temporal.Instant.from("+010000-01-01T00:00:00Z"));
	}).toThrow();
	expect(() => {
		formatRfc7231(Temporal.ZonedDateTime.from("+010000-01-01T00:00:00Z[UTC]"));
	}).toThrow();
});
