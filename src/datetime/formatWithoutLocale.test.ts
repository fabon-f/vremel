import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { formatWithoutLocale } from "./formatWithoutLocale.js";

const target = "2024-01-02T00:03:04+00:00[Europe/London]";

test("Unbalanced single quotes", () => {
	expect(() => {
		formatWithoutLocale(Temporal.PlainDate.from(target), `'ab''''`);
	}).toThrowError();
});

test("single quotes", () => {
	expect(
		formatWithoutLocale(Temporal.PlainDate.from(target), `'' 'dd'''`),
	).toEqual(`' dd'`);
	expect(
		formatWithoutLocale(Temporal.PlainDate.from(target), `''yy M d''`),
	).toEqual(`'24 1 2'`);
});

test("year", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDate.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	const ng = [
		Temporal.PlainTime.from(target),
		Temporal.PlainMonthDay.from(target),
	];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "y yy yyy yyyy yyyyy")).toEqual(
			"2024 24 2024 2024 02024",
		);
	}
	for (const dt of ng) {
		for (const p of ["y", "yy", "yyy", "yyyy"]) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("month", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDate.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainMonthDay.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	const ng = [Temporal.PlainTime.from(target)];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "M MM")).toEqual("1 01");
		expect(() => {
			formatWithoutLocale(dt, "MMM");
		}).toThrowError();
	}
	for (const dt of ng) {
		for (const p of ["M", "MM"]) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("day", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDate.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainMonthDay.from(target),
	];
	const ng = [
		Temporal.PlainTime.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "d dd")).toEqual("2 02");
		expect(() => {
			formatWithoutLocale(dt, "ddd");
		}).toThrowError();
	}
	for (const dt of ng) {
		for (const p of ["d", "dd"]) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("hour", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainTime.from(target),
	];
	const ng = [
		Temporal.PlainDate.from(target),
		Temporal.PlainMonthDay.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "h hh H HH")).toEqual("12 12 0 00");
		expect(
			formatWithoutLocale(Temporal.PlainTime.from("01:00:00"), "h hh"),
		).toEqual("1 01");
		expect(() => {
			formatWithoutLocale(dt, "HHH");
		}).toThrowError();
		expect(() => {
			formatWithoutLocale(dt, "hhh");
		}).toThrowError();
	}
	for (const dt of ng) {
		for (const p of ["h", "hh", "H", "HH"]) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("minute", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainTime.from(target),
	];
	const ng = [
		Temporal.PlainDate.from(target),
		Temporal.PlainMonthDay.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "m mm")).toEqual("3 03");
		expect(() => {
			formatWithoutLocale(dt, "mmm");
		}).toThrowError();
	}
	for (const dt of ng) {
		for (const p of ["m", "mm"]) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("second", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainTime.from(target),
	];
	const ng = [
		Temporal.PlainDate.from(target),
		Temporal.PlainMonthDay.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "s ss")).toEqual("4 04");
		expect(() => {
			formatWithoutLocale(dt, "sss");
		}).toThrowError();
	}
	for (const dt of ng) {
		for (const p of ["s", "ss"]) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("fractional second", () => {
	const ok = [
		Temporal.ZonedDateTime.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainTime.from(target),
	];
	const ng = [
		Temporal.PlainDate.from(target),
		Temporal.PlainMonthDay.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	for (const dt of ok) {
		expect(formatWithoutLocale(dt, "S SSS SSSSSSSSSS")).toEqual(
			"0 000 0000000000",
		);
	}
	for (const dt of ng) {
		expect(() => {
			formatWithoutLocale(dt, "S");
		}).toThrowError();
	}
	expect(
		formatWithoutLocale(Temporal.PlainTime.from("00:00:00.12345"), "SSSS"),
	).toEqual("1234");
});

test("offset", () => {
	const dt = Temporal.ZonedDateTime.from(target);
	expect(formatWithoutLocale(dt, "x xx xxx xxxx xxxxx")).toEqual(
		"+00 +0000 +00:00 +0000 +00:00",
	);
	expect(formatWithoutLocale(dt, "X XX XXX XXXX XXXXX")).toEqual("Z Z Z Z Z");
	const dt2 = Temporal.ZonedDateTime.from(
		"2024-01-01T00:00:00-09:30[Pacific/Marquesas]",
	);
	expect(formatWithoutLocale(dt2, "x xx xxx xxxx xxxxx")).toEqual(
		"-0930 -0930 -09:30 -0930 -09:30",
	);
	expect(formatWithoutLocale(dt2, "X XX XXX XXXX XXXXX")).toEqual(
		"-0930 -0930 -09:30 -0930 -09:30",
	);
	expect(() => {
		formatWithoutLocale(dt, "XXXXXX");
	}).toThrowError();
	expect(() => {
		formatWithoutLocale(dt, "xxxxxx");
	}).toThrowError();

	const ng = [
		Temporal.PlainDate.from(target),
		Temporal.PlainTime.from(target),
		Temporal.PlainDateTime.from(target),
		Temporal.PlainMonthDay.from(target),
		Temporal.PlainYearMonth.from(target),
	];
	for (const dt of ng) {
		const patterns = [
			"x",
			"xx",
			"xxx",
			"xxxx",
			"xxxxx",
			"X",
			"XX",
			"XXX",
			"XXXX",
			"XXXXX",
		];
		for (const p of patterns) {
			expect(() => {
				formatWithoutLocale(dt, p);
			}).toThrowError();
		}
	}
});

test("ZonedDateTime with non-ISO calendar", () => {
	expect(() => {
		formatWithoutLocale(
			Temporal.ZonedDateTime.from(target).withCalendar("hebrew"),
			"yyyy/MM/dd",
		);
	}).toThrow();
	expect(
		formatWithoutLocale(
			Temporal.ZonedDateTime.from(target).withCalendar("hebrew"),
			"yyyy/MM/dd",
			{ formatNonIsoDate: true },
		),
	).toEqual("5784/04/21");
});

test("PlainDateTime with non-ISO calendar", () => {
	expect(() => {
		formatWithoutLocale(
			Temporal.PlainDateTime.from(target).withCalendar("hebrew"),
			"yyyy/MM/dd",
		);
	}).toThrow();
	expect(
		formatWithoutLocale(
			Temporal.PlainDateTime.from(target).withCalendar("hebrew"),
			"yyyy/MM/dd",
			{ formatNonIsoDate: true },
		),
	).toEqual("5784/04/21");
});

test("PlainDate with non-ISO calendar", () => {
	expect(() => {
		formatWithoutLocale(
			Temporal.PlainDate.from(target).withCalendar("hebrew"),
			"yyyy/MM/dd",
		);
	}).toThrow();
	expect(
		formatWithoutLocale(
			Temporal.PlainDate.from(target).withCalendar("hebrew"),
			"yyyy/MM/dd",
			{ formatNonIsoDate: true },
		),
	).toEqual("5784/04/21");
});

test("PlainYearMonth with non-ISO calendar", () => {
	expect(() => {
		formatWithoutLocale(
			Temporal.PlainDate.from(target).withCalendar("hebrew").toPlainYearMonth(),
			"yyyy/MM",
		);
	}).toThrow();
	expect(
		formatWithoutLocale(
			Temporal.PlainDate.from(target).withCalendar("hebrew").toPlainYearMonth(),
			"yyyy/MM",
			{ formatNonIsoDate: true },
		),
	).toEqual("5784/04");
});

test("PlainMonthDay with non-ISO calendar", () => {
	const md = Temporal.PlainMonthDay.from({
		// 15 Adar I
		monthCode: "M05L",
		day: 15,
		calendar: "hebrew",
	});
	expect(() => {
		formatWithoutLocale(md, "MM", { formatNonIsoDate: true });
	}).toThrowError();
});
