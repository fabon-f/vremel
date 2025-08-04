import { describe, expect, test } from "vitest";

import { padLeadingZeros } from "./_padLeadingZeros.js";
import type { LocaleDataForParser } from "./parse.js";
import { parse } from "./parse.js";

describe("real-world examples", () => {
	test("japanese era", () => {
		expect(
			Temporal.PlainDate.from({
				...parse("R1/8/1", "GGGGGy/M/d", {
					era: { narrow: { reiwa: "R", heisei: "H", showa: "S" } },
				}),
				calendar: "japanese",
			}),
		).toEqual(Temporal.PlainDate.from("2019-08-01[u-ca=japanese]"));
	});
	test("Russian", () => {
		const russianMonths =
			"января февраля марта апреля мая июня июля августа сентября октября ноября декабря".split(
				" ",
			);
		const locale = {
			month: {
				format: {
					wide: russianMonths,
				},
			},
		};
		expect(
			Temporal.PlainDate.from(parse("9 февраля 2025", "d MMMM y", locale)),
		).toEqual(Temporal.PlainDate.from("2025-02-09"));
	});
});

const gregoryEras = {
	abbreviated: {
		bce: "BBB",
		ce: "AAA",
	},
	wide: {
		bce: "BBBBBBBBB",
		ce: "AAAAAAAAA",
	},
	narrow: {
		bce: "B",
		ce: "A",
	},
} satisfies LocaleDataForParser["era"];

const isoMonths = {
	format: {
		abbreviated: [
			"AAA",
			"BBB",
			"CCC",
			"DDD",
			"EEE",
			"FFF",
			"GGG",
			"HHH",
			"III",
			"JJJ",
			"KKK",
			"LLL",
		],
		wide: [
			"Aaaaa",
			"Bbbbb",
			"Ccccc",
			"Ddddd",
			"Eeeee",
			"Fffff",
			"Ggggg",
			"Hhhhh",
			"Iiiii",
			"Jjjjj",
			"Kkkkk",
			"Lllll",
		],
		narrow: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
	},
	standalone: {
		abbreviated: [
			"AAAs",
			"BBBs",
			"CCCs",
			"DDDs",
			"EEEs",
			"FFFs",
			"GGGs",
			"HHHs",
			"IIIs",
			"JJJs",
			"KKKs",
			"LLLs",
		],
		wide: [
			"Aaaaas",
			"Bbbbbs",
			"Cccccs",
			"Ddddds",
			"Eeeees",
			"Fffffs",
			"Gggggs",
			"Hhhhhs",
			"Iiiiis",
			"Jjjjjs",
			"Kkkkks",
			"Llllls",
		],
		narrow: [
			"As",
			"Bs",
			"Cs",
			"Ds",
			"Es",
			"Fs",
			"Gs",
			"Hs",
			"Is",
			"Js",
			"Ks",
			"Ls",
		],
	},
} satisfies LocaleDataForParser["month"];

const isoMonthsWithMonthCode = {
	format: {
		abbreviated: {
			M01: "AAA",
			M02: "BBB",
			M03: "CCC",
			M04: "DDD",
			M05: "EEE",
			M06: "FFF",
			M07: "GGG",
			M08: "HHH",
			M09: "III",
			M10: "JJJ",
			M11: "KKK",
			M12: "LLL",
		},
		wide: {
			M01: "Aaaaa",
			M02: "Bbbbb",
			M03: "Ccccc",
			M04: "Ddddd",
			M05: "Eeeee",
			M06: "Fffff",
			M07: "Ggggg",
			M08: "Hhhhh",
			M09: "Iiiii",
			M10: "Jjjjj",
			M11: "Kkkkk",
			M12: "Lllll",
		},
		narrow: {
			M01: "A",
			M02: "B",
			M03: "C",
			M04: "D",
			M05: "E",
			M06: "F",
			M07: "G",
			M08: "H",
			M09: "I",
			M10: "J",
			M11: "K",
			M12: "L",
		},
	},
	standalone: {
		abbreviated: {
			M01: "AAAs",
			M02: "BBBs",
			M03: "CCCs",
			M04: "DDDs",
			M05: "EEEs",
			M06: "FFFs",
			M07: "GGGs",
			M08: "HHHs",
			M09: "IIIs",
			M10: "JJJs",
			M11: "KKKs",
			M12: "LLLs",
		},
		wide: {
			M01: "Aaaaas",
			M02: "Bbbbbs",
			M03: "Cccccs",
			M04: "Ddddds",
			M05: "Eeeees",
			M06: "Fffffs",
			M07: "Gggggs",
			M08: "Hhhhhs",
			M09: "Iiiiis",
			M10: "Jjjjjs",
			M11: "Kkkkks",
			M12: "Llllls",
		},
		narrow: {
			M01: "As",
			M02: "Bs",
			M03: "Cs",
			M04: "Ds",
			M05: "Es",
			M06: "Fs",
			M07: "Gs",
			M08: "Hs",
			M09: "Is",
			M10: "Js",
			M11: "Ks",
			M12: "Ls",
		},
	},
} satisfies LocaleDataForParser["month"];

const dayPeriods = {
	abbreviated: {
		am: "Aa",
		pm: "Bb",
	},
	wide: {
		am: "Aaaa",
		pm: "Bbbb",
	},
	narrow: {
		am: "A",
		pm: "B",
	},
} satisfies LocaleDataForParser["dayPeriod"];

test.for([
	"GGGGGG",
	"MMMMMM",
	"LLLLLL",
	"ddd",
	"aaaaaa",
	"hhh",
	"HHH",
	"KKK",
	"mmm",
	"sss",
])("Invalid token %s", (token) => {
	expect(() => {
		parse("", token);
	}).toThrow("Unknown field");
});

test("era", () => {
	const expected = {
		era: "ce",
		eraYear: 2025,
	};
	expect(
		parse(`${gregoryEras.abbreviated.ce} 2025`, "G y", {
			era: gregoryEras,
		}),
	).toEqual(expected);
	expect(
		parse(`${gregoryEras.abbreviated.ce} 2025`, "GG y", {
			era: gregoryEras,
		}),
	).toEqual(expected);
	expect(
		parse(`${gregoryEras.abbreviated.ce} 2025`, "GGG y", {
			era: gregoryEras,
		}),
	).toEqual(expected);
	expect(
		parse(`${gregoryEras.wide.ce} 2025`, "GGGG y", {
			era: gregoryEras,
		}),
	).toEqual(expected);
	expect(
		parse(`${gregoryEras.narrow.ce} 2025`, "GGGGG y", {
			era: gregoryEras,
		}),
	).toEqual(expected);
});

test("year", () => {
	expect(parse("2025", "y")).toEqual({
		year: 2025,
	});
	expect(() => {
		parse("0020", "y");
	}).toThrow();
	expect(parse("210", "y")).toEqual({
		year: 210,
	});
	expect(parse("0210", "yyyy")).toEqual({
		year: 210,
	});
	expect(parse("02025", "yyyyy")).toEqual({
		year: 2025,
	});
});

test("month number", () => {
	const expected = {
		month: 1,
	};
	expect(parse("1", "M")).toEqual(expected);
	expect(() => {
		parse("01", "M");
	}).toThrow();
	expect(parse("01", "MM")).toEqual(expected);
	expect(parse("1", "L")).toEqual(expected);
	expect(() => {
		parse("01", "L");
	}).toThrow();
	expect(parse("01", "LL")).toEqual(expected);
});

test("month name to month number", () => {
	const expected = {
		month: 3,
	};
	expect(
		parse(`1 ${isoMonths.format.abbreviated[2]}`, "1 MMM", {
			month: isoMonths,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonths.format.wide[2]}`, "1 MMMM", {
			month: isoMonths,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonths.format.narrow[2]}`, "1 MMMMM", {
			month: isoMonths,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonths.standalone.abbreviated[2]}`, "1 LLL", {
			month: isoMonths,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonths.standalone.wide[2]}`, "1 LLLL", {
			month: isoMonths,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonths.standalone.narrow[2]}`, "1 LLLLL", {
			month: isoMonths,
		}),
	).toEqual(expected);
});

test("month name to month code", () => {
	const expected = {
		monthCode: "M03",
	};
	expect(
		parse(`1 ${isoMonthsWithMonthCode.format.abbreviated.M03}`, "1 MMM", {
			month: isoMonthsWithMonthCode,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonthsWithMonthCode.format.wide.M03}`, "1 MMMM", {
			month: isoMonthsWithMonthCode,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonthsWithMonthCode.format.narrow.M03}`, "1 MMMMM", {
			month: isoMonthsWithMonthCode,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonthsWithMonthCode.standalone.abbreviated.M03}`, "1 LLL", {
			month: isoMonthsWithMonthCode,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonthsWithMonthCode.standalone.wide.M03}`, "1 LLLL", {
			month: isoMonthsWithMonthCode,
		}),
	).toEqual(expected);
	expect(
		parse(`1 ${isoMonthsWithMonthCode.standalone.narrow.M03}`, "1 LLLLL", {
			month: isoMonthsWithMonthCode,
		}),
	).toEqual(expected);
});

test("day", () => {
	expect(parse("1", "d")).toEqual({
		day: 1,
	});
	expect(parse("01", "dd")).toEqual({
		day: 1,
	});
	expect(() => {
		parse("01", "d");
	}).toThrow();
});

test("day period and 12-hour clock", () => {
	const am1 = {
		hour: 1,
	};
	expect(
		parse(`${dayPeriods.abbreviated.am} 1`, "a h", { dayPeriod: dayPeriods }),
	).toEqual(am1);
	expect(
		parse(`${dayPeriods.abbreviated.am} 1`, "aa h", { dayPeriod: dayPeriods }),
	).toEqual(am1);
	expect(
		parse(`${dayPeriods.abbreviated.am} 1`, "aaa h", { dayPeriod: dayPeriods }),
	).toEqual(am1);
	expect(
		parse(`${dayPeriods.wide.am} 1`, "aaaa h", { dayPeriod: dayPeriods }),
	).toEqual(am1);
	expect(
		parse(`${dayPeriods.narrow.am} 1`, "aaaaa h", { dayPeriod: dayPeriods }),
	).toEqual(am1);

	expect(
		parse(`${dayPeriods.abbreviated.pm} 10`, "a h", { dayPeriod: dayPeriods }),
	).toEqual({ hour: 22 });

	expect(
		parse(`${dayPeriods.abbreviated.am} 12`, "a h", { dayPeriod: dayPeriods }),
	).toEqual({ hour: 0 });
	expect(
		parse(`${dayPeriods.abbreviated.pm} 12`, "a h", { dayPeriod: dayPeriods }),
	).toEqual({ hour: 12 });
	expect(
		parse(`${dayPeriods.abbreviated.am} 0`, "a K", { dayPeriod: dayPeriods }),
	).toEqual({ hour: 0 });
	expect(
		parse(`${dayPeriods.abbreviated.pm} 0`, "a K", { dayPeriod: dayPeriods }),
	).toEqual({ hour: 12 });
});

test("12-hour clock range", () => {
	for (let i = 1; i <= 11; i++) {
		expect(
			parse(`${dayPeriods.abbreviated.am} ${i}`, "a h", {
				dayPeriod: dayPeriods,
			}),
		).toEqual({ hour: i });
		expect(
			parse(`${dayPeriods.abbreviated.am} ${padLeadingZeros(i, 2)}`, "a hh", {
				dayPeriod: dayPeriods,
			}),
		).toEqual({ hour: i });
	}
	expect(
		parse(`${dayPeriods.abbreviated.am} 12`, "a h", {
			dayPeriod: dayPeriods,
		}),
	).toEqual({ hour: 0 });
	expect(
		parse(`${dayPeriods.abbreviated.am} 12`, "a hh", {
			dayPeriod: dayPeriods,
		}),
	).toEqual({ hour: 0 });

	expect(() => {
		parse(`${dayPeriods.abbreviated.am} 0`, "a h", {
			dayPeriod: dayPeriods,
		});
	}).toThrow();
	expect(() => {
		parse(`${dayPeriods.abbreviated.am} 00`, "a hh", {
			dayPeriod: dayPeriods,
		});
	}).toThrow();

	for (let i = 0; i <= 11; i++) {
		expect(
			parse(`${dayPeriods.abbreviated.am} ${i}`, "a K", {
				dayPeriod: dayPeriods,
			}),
		).toEqual({ hour: i });
		expect(
			parse(`${dayPeriods.abbreviated.am} ${padLeadingZeros(i, 2)}`, "a KK", {
				dayPeriod: dayPeriods,
			}),
		).toEqual({ hour: i });
	}
	expect(() => {
		parse(`${dayPeriods.abbreviated.am} 12`, "a K", {
			dayPeriod: dayPeriods,
		});
	}).toThrow();
	expect(() => {
		parse(`${dayPeriods.abbreviated.am} 12`, "a KK", {
			dayPeriod: dayPeriods,
		});
	}).toThrow();
});

test("12-hour clock without day period", () => {
	expect(() => {
		parse(`12`, "h", { dayPeriod: dayPeriods });
	}).toThrow();
});

test("24-hour clock", () => {
	for (let i = 0; i <= 23; i++) {
		expect(
			parse(`${dayPeriods.abbreviated.am} ${i}`, "a H", {
				dayPeriod: dayPeriods,
			}),
		).toEqual({ hour: i });
		expect(
			parse(`${dayPeriods.abbreviated.am} ${padLeadingZeros(i, 2)}`, "a HH", {
				dayPeriod: dayPeriods,
			}),
		).toEqual({ hour: i });
	}
	expect(() => {
		parse(`24`, "HH", { dayPeriod: dayPeriods });
	}).toThrow();
	expect(() => {
		parse(`24`, "H", { dayPeriod: dayPeriods });
	}).toThrow();
});

test("minute", () => {
	expect(parse("0", "m")).toEqual({ minute: 0 });
	expect(parse("00", "mm")).toEqual({ minute: 0 });
	expect(parse("59", "m")).toEqual({ minute: 59 });
	expect(parse("59", "mm")).toEqual({ minute: 59 });
});

test("second", () => {
	expect(parse("0", "s")).toEqual({ second: 0 });
	expect(parse("00", "ss")).toEqual({ second: 0 });
	expect(parse("59", "s")).toEqual({ second: 59 });
	expect(parse("59", "ss")).toEqual({ second: 59 });
});

test("fractional second", () => {
	expect(parse("0", "S")).toEqual({
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	});
	expect(parse("12", "SS")).toEqual({
		millisecond: 120,
		microsecond: 0,
		nanosecond: 0,
	});
	expect(parse("0123456789", "SSSSSSSSSS")).toEqual({
		millisecond: 12,
		microsecond: 345,
		nanosecond: 678,
	});
});
