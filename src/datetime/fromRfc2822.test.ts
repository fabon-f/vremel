import { expect, test } from "vitest";

import { fromRfc2822 } from "./fromRfc2822.js";

test("PlainDateTime", () => {
	expect(fromRfc2822("07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
});

test("Instant", () => {
	expect(fromRfc2822("07 Jun 2024 01:23:45 +0900", Temporal.Instant)).toEqual(
		Temporal.Instant.from("2024-06-07T01:23:45+09:00"),
	);
});

test("ZonedDateTime", () => {
	expect(fromRfc2822("07 Jun 2024 01:23:45 +0900", Temporal.ZonedDateTime)).toEqual(
		Temporal.ZonedDateTime.from("2024-06-07T01:23:45+09:00[+09:00]"),
	);
});

test("day of week", () => {
	expect(fromRfc2822("Fri, 07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
});

test.for([
	["Mon, 1 Jan 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
	["1 Jan 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
] as [string, string][])("one-digit day", ([date, expected]) => {
	expect(fromRfc2822(date, Temporal.Instant)).toEqual(Temporal.Instant.from(expected));
});

test.for([
	["mON, 01 Jan 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
	["mon, 01 Jan 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
	["MON, 01 Jan 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
] as [string, string][])("case-insensitive weekday names", ([date, expected]) => {
	expect(fromRfc2822(date, Temporal.Instant)).toEqual(Temporal.Instant.from(expected));
});

test.for([
	["Mon, 01 jAN 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
	["Mon, 01 jan 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
	["Mon, 01 JAN 2024 01:23:45 +0000", "2024-01-01T01:23:45Z"],
] as [string, string][])("case-insensitive RFC 2822 month names", ([date, expected]) => {
	expect(fromRfc2822(date, Temporal.Instant)).toEqual(Temporal.Instant.from(expected));
});

test("wrong day of week", () => {
	expect(() => {
		fromRfc2822("Tue, 07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime);
	}).toThrow(/Wrong day of week/);
});

test("string without second", () => {
	expect(fromRfc2822("07 Jun 2024 01:23 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:00"),
	);
});

test("obsolete 2-digit year", () => {
	expect(fromRfc2822("07 Jun 24 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
	expect(fromRfc2822("07 Jun 00 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2000-06-07T01:23:45"),
	);
	expect(fromRfc2822("07 Jun 49 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2049-06-07T01:23:45"),
	);
	expect(fromRfc2822("07 Jun 50 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("1950-06-07T01:23:45"),
	);
	expect(fromRfc2822("07 Jun 99 01:23:45 +0900", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("1999-06-07T01:23:45"),
	);
});

test.for(["UT", "ut", "Ut", "uT", "GMT", "gmt", "gMT", "Z", "z"])(
	"time zones with zero offset: %s",
	(timeZone) => {
		const rfc2822 = `07 Jun 2024 01:23:45 ${timeZone}`;
		expect(fromRfc2822(rfc2822, Temporal.Instant)).toEqual(
			Temporal.Instant.from("2024-06-07T01:23:45+00:00"),
		);
		expect(fromRfc2822(rfc2822, Temporal.ZonedDateTime)).toEqual(
			Temporal.ZonedDateTime.from("2024-06-07T01:23:45+00:00[+00:00]"),
		);
	},
);

test("time zone -0000", () => {
	expect(fromRfc2822("07 Jun 24 01:23:45 -0000", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 -0000", Temporal.Instant);
	}).toThrow();
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 -0000", Temporal.ZonedDateTime);
	}).toThrow();
});

test("militatry time zone", () => {
	expect(fromRfc2822("07 Jun 24 01:23:45 A", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
	expect(fromRfc2822("07 Jun 24 01:23:45 a", Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from("2024-06-07T01:23:45"),
	);
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 A", Temporal.Instant);
	}).toThrow();
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 A", Temporal.ZonedDateTime);
	}).toThrow();
	expect(() => {
		fromRfc2822("07 Jun 2024 01:23:45 J", Temporal.PlainDateTime);
	}).toThrow();
});

test.for([
	["EST", "-05:00"],
	["EDT", "-04:00"],
	["CST", "-06:00"],
	["CDT", "-05:00"],
	["MST", "-07:00"],
	["MDT", "-06:00"],
	["PST", "-08:00"],
	["PDT", "-07:00"],
	["Est", "-05:00"],
	["est", "-05:00"],
	["eST", "-05:00"],
] as [string, string][])("North American time zones", ([timeZone, offsetTimeZone]) => {
	const rfc2822 = `07 Jun 2024 01:23:45 ${timeZone}`;
	const expected =
		Temporal.PlainDateTime.from("2024-06-07T01:23:45").toZonedDateTime(offsetTimeZone);

	expect(fromRfc2822(rfc2822, Temporal.Instant)).toEqual(expected.toInstant());
	expect(fromRfc2822(rfc2822, Temporal.ZonedDateTime)).toEqual(expected);
});

test.for(["\u017fat, 08 Jun 2024 01:23:45 +0000", "07 Jun 2024 01:23:45 \u212a"])(
	"rejects non-ASCII lookalikes in names (%s)",
	(date) => {
		expect(() => fromRfc2822(date, Temporal.PlainDateTime)).toThrow();
	},
);

test.for(["ABC", "+0061", "-2400"])("Invalid time zone (%s)", (zone) => {
	expect(() => {
		fromRfc2822(`07 Jun 2024 01:23:45 ${zone}`, Temporal.ZonedDateTime);
	}).toThrow();
	expect(() => {
		fromRfc2822(`07 Jun 2024 01:23:45 ${zone}`, Temporal.Instant);
	}).toThrow();
	expect(() => {
		fromRfc2822(`07 Jun 2024 01:23:45 ${zone}`, Temporal.PlainDateTime);
	}).toThrow();
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
	expect(() => fromRfc2822("07 Jun 2024 01:23:45 +0000 (comment", Temporal.Instant)).toThrow();
	expect(() => fromRfc2822("07 Jun 2024 (comment)) 01:23:45 +0000", Temporal.Instant)).toThrow();
});

test("invalid day of week", () => {
	expect(() => {
		fromRfc2822("Mot, 07 Jun 2024 01:23:45 +0900", Temporal.PlainDateTime);
	}).toThrow(/Mot/);
});

test("invalid month name", () => {
	expect(() => {
		fromRfc2822("Mon, 01 Jat 2024 01:23:45 +0900", Temporal.PlainDateTime);
	}).toThrow(/Jat/);
});

test("leap second", () => {
	const rfc2822 = "Fri, 07 Jun 2024 08:59:60 +0900";
	const result = "2024-06-07T08:59:59+09:00[+09:00]";
	expect(fromRfc2822(rfc2822, Temporal.Instant)).toEqual(Temporal.Instant.from(result));
	expect(fromRfc2822(rfc2822, Temporal.ZonedDateTime)).toEqual(Temporal.ZonedDateTime.from(result));
	expect(fromRfc2822(rfc2822, Temporal.PlainDateTime)).toEqual(Temporal.PlainDateTime.from(result));
});

test.for(["Sat, 29 Feb 2025", "29 Feb 2025", "32 Jan 2025"])(
	"Invalid combination of year, month, and day (%s)",
	(date) => {
		const rfc2822 = `${date} 00:00:00 GMT`;
		expect(() => {
			fromRfc2822(rfc2822, Temporal.Instant);
		}).toThrow();
		expect(() => {
			fromRfc2822(rfc2822, Temporal.PlainDateTime);
		}).toThrow();
		expect(() => {
			fromRfc2822(rfc2822, Temporal.ZonedDateTime);
		}).toThrow();
	},
);

test.for(["24:00:00", "23:58:61", "12:60:00"])("Invalid hour, minute, and second (%s)", (time) => {
	const rfc2822 = `Fri, 07 Jun 2024 ${time} GMT`;
	expect(() => {
		fromRfc2822(rfc2822, Temporal.Instant);
	}).toThrow();
	expect(() => {
		fromRfc2822(rfc2822, Temporal.PlainDateTime);
	}).toThrow();
	expect(() => {
		fromRfc2822(rfc2822, Temporal.ZonedDateTime);
	}).toThrow();
});

test.for([
	["07 Jun 0824 01:23:45 +0900", "0824-06-07T01:23:45+09:00[+09:00]"],
	["07 Jun 0024 01:23:45 +0900", "0024-06-07T01:23:45+09:00[+09:00]"],
	["01 Jan 0000 01:23:45 +0900", "0000-01-01T01:23:45+09:00[+09:00]"],
] as [string, string][])("when year is less than 1000", ([rfc2822, iso8601]) => {
	expect(fromRfc2822(rfc2822, Temporal.Instant)).toEqual(Temporal.Instant.from(iso8601));
	expect(fromRfc2822(rfc2822, Temporal.PlainDateTime)).toEqual(
		Temporal.PlainDateTime.from(iso8601),
	);
	expect(fromRfc2822(rfc2822, Temporal.ZonedDateTime)).toEqual(
		Temporal.ZonedDateTime.from(iso8601),
	);
});

test("ReDoS regression test", { timeout: 10 }, () => {
	const payload = "\t".repeat(50000);
	expect(() => {
		fromRfc2822(payload, Temporal.Instant);
	}).toThrow();
});
