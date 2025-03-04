import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfYear } from "./endOfYear.js";

test("PlainDateTime", () => {
	expect(
		endOfYear(Temporal.PlainDateTime.from("2024-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-12-31T23:59:59.999999999"));
});

test("PlainDate", () => {
	expect(endOfYear(Temporal.PlainDate.from("2024-02-23"))).toEqual(
		Temporal.PlainDate.from("2024-12-31"),
	);
});

test("PlainYearMonth", () => {
	expect(endOfYear(Temporal.PlainYearMonth.from("2024-02"))).toEqual(
		Temporal.PlainYearMonth.from("2024-12"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	// 19 Adar I 5784 -> 29 Elul 5784
	expect(endOfYear(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]"))).toEqual(
		Temporal.PlainDate.from("2024-10-02[u-ca=hebrew]"),
	);
});

test("PlainYearMonth with non-ISO calendar", () => {
	// Adar I 5784 -> Elul 5784
	expect(
		endOfYear(Temporal.PlainYearMonth.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainYearMonth.from("2024-10-02[u-ca=hebrew]"));
});

test("ZonedDateTime without offset transition", () => {
	expect(
		endOfYear(
			Temporal.ZonedDateTime.from("2024-03-21T01:23:45+09:00[Asia/Tokyo]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2024-12-31T23:59:59.999999999+09:00[Asia/Tokyo]",
		),
	);
});

test("ZonedDateTime with forward transition", () => {
	expect(
		endOfYear(
			Temporal.ZonedDateTime.from(
				"1994-12-29T00:00:00-10:00[Pacific/Kiritimati]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"1994-12-30T23:59:59.999999999-10:00[Pacific/Kiritimati]",
		),
	);
	expect(
		endOfYear(
			Temporal.ZonedDateTime.from(
				// 20 Aban 1332
				"1953-11-11T00:00:00+08:00[Asia/Macau][u-ca=persian]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 29 Esfand 1332
			"1954-03-20T22:59:59.999999999+08:00[Asia/Macau][u-ca=persian]",
		),
	);
});

test("ZonedDateTime with backward transition", () => {
	expect(
		endOfYear(
			Temporal.ZonedDateTime.from("1996-12-31T23:00:00-05:00[America/Managua]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"1996-12-31T23:59:59.999999999-06:00[America/Managua]",
		),
	);
	expect(
		endOfYear(
			Temporal.ZonedDateTime.from(
				// 26 Sivan 5738
				"1978-07-01T00:00:00+03:00[Asia/Famagusta][u-ca=hebrew]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 29 Elul 5738
			"1978-10-01T23:59:59.999999999+02:00[Asia/Famagusta][u-ca=hebrew]",
		),
	);
});
