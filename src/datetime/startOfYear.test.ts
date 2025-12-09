import { expect, test } from "vitest";

import { startOfYear } from "./startOfYear.js";

test("PlainDateTime", () => {
	expect(startOfYear(Temporal.PlainDateTime.from("2024-02-23T12:34:56.789123456"))).toEqual(
		Temporal.PlainDateTime.from("2024-01-01T00:00:00"),
	);
});

test("PlainDate", () => {
	expect(startOfYear(Temporal.PlainDate.from("2024-02-23"))).toEqual(
		Temporal.PlainDate.from("2024-01-01"),
	);
});

test("PlainYearMonth", () => {
	expect(startOfYear(Temporal.PlainYearMonth.from("2024-02"))).toEqual(
		Temporal.PlainYearMonth.from("2024-01"),
	);
});

test("PlainDate with non-ISO calendar", () => {
	// 19 Adar I 5784 -> 1 Tishrei 5784
	expect(startOfYear(Temporal.PlainDate.from("2024-02-28[u-ca=hebrew]"))).toEqual(
		Temporal.PlainDate.from("2023-09-16[u-ca=hebrew]"),
	);
});

test("PlainYearMonth with non-ISO calendar", () => {
	// Adar I 5784 -> Tishrei 5784
	expect(startOfYear(Temporal.PlainYearMonth.from("2024-02-28[u-ca=hebrew]"))).toEqual(
		Temporal.PlainYearMonth.from("2023-09-16[u-ca=hebrew]"),
	);
});

test("ZonedDateTime without offset transition", () => {
	expect(startOfYear(Temporal.ZonedDateTime.from("2024-03-21T01:23:45+09:00[Asia/Tokyo]"))).toEqual(
		Temporal.ZonedDateTime.from("2024-01-01T00:00:00+09:00[Asia/Tokyo]"),
	);
});

test("ZonedDateTime and backward transition", () => {
	expect(
		startOfYear(Temporal.ZonedDateTime.from("1922-06-30T00:00:00-07:00[America/Mexico_City]")),
	).toEqual(Temporal.ZonedDateTime.from("1922-01-01T00:00:00-06:36:36[America/Mexico_City]"));
	expect(
		startOfYear(
			Temporal.ZonedDateTime.from(
				// Jumada I 14, 1337 AH
				"1919-02-15T00:00:00+00:00[Europe/Madrid][u-ca=islamic-civil]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// Muharram 1, 1337 AH
			"1918-10-07T00:00:00+01:00[Europe/Madrid][u-ca=islamic-civil]",
		),
	);
});

test("ZonedDateTime and forward transition", () => {
	expect(
		startOfYear(Temporal.ZonedDateTime.from("2004-02-01T12:00:00+10:00[Asia/Khandyga]")),
	).toEqual(Temporal.ZonedDateTime.from("2004-01-01T01:00:00+10:00[Asia/Khandyga]"));
	expect(
		startOfYear(
			Temporal.ZonedDateTime.from(
				// 16 Tevet 5706
				"1945-12-20T02:30:00+11:30[Pacific/Nauru][u-ca=hebrew]",
			),
		),
	).toEqual(
		Temporal.ZonedDateTime.from(
			// 1 Tishri 5706
			"1945-09-08T02:30:00+11:30[Pacific/Nauru][u-ca=hebrew]",
		),
	);
});
