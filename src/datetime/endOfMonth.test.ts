import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { endOfMonth } from "./endOfMonth.js";

test("PlainDateTime", () => {
	expect(
		endOfMonth(Temporal.PlainDateTime.from("2024-01-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-01-31T23:59:59.999999999"));
	expect(
		endOfMonth(Temporal.PlainDateTime.from("2024-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2024-02-29T23:59:59.999999999"));
	expect(
		endOfMonth(Temporal.PlainDateTime.from("2025-02-23T12:34:56.789123456")),
	).toEqual(Temporal.PlainDateTime.from("2025-02-28T23:59:59.999999999"));
});

test("PlainDate", () => {
	expect(endOfMonth(Temporal.PlainDate.from("2024-01-23"))).toEqual(
		Temporal.PlainDate.from("2024-01-31"),
	);
	expect(endOfMonth(Temporal.PlainDate.from("2024-02-23"))).toEqual(
		Temporal.PlainDate.from("2024-02-29"),
	);
	expect(endOfMonth(Temporal.PlainDate.from("2025-02-23"))).toEqual(
		Temporal.PlainDate.from("2025-02-28"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	expect(
		// 19 Adar I 5784
		endOfMonth(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]")),
	).toEqual(Temporal.PlainDate.from("2024-03-10[u-ca=hebrew]"));
});

test("ZonedDateTime without offset transition", () => {
	expect(
		endOfMonth(
			Temporal.ZonedDateTime.from("2024-03-21T01:23:45+09:00[Asia/Tokyo]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"2024-03-31T23:59:59.999999999+09:00[Asia/Tokyo]",
		),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		endOfMonth(
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
		endOfMonth(
			Temporal.ZonedDateTime.from(
				// 11 Adar 5785
				"2025-03-25T00:00:00-02:00[America/Nuuk][u-ca=hebrew]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 29 Adar 5785
			"2025-03-29T22:59:59.999999999-02:00[America/Nuuk][u-ca=hebrew]",
		),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		endOfMonth(
			Temporal.ZonedDateTime.from("1996-12-31T23:00:00-05:00[America/Managua]"),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			"1996-12-31T23:59:59.999999999-06:00[America/Managua]",
		),
	);
	expect(
		endOfMonth(
			Temporal.ZonedDateTime.from(
				// 19 Elul 5738
				"1978-09-21T00:00:00+03:00[Asia/Famagusta][u-ca=hebrew]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 29 Elul 5738
			"1978-10-01T23:59:59.999999999+02:00[Asia/Famagusta][u-ca=hebrew]",
		),
	);
});
