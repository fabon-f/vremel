import { createRecord } from "./_createRecord.js";
import { escapeRegExp } from "./_escapeRegExp.js";
import { tokenize } from "./_ldmrDatePattern.js";
import { unionRegExp } from "./_unionRegExp.js";

/**
 * parse result which can be passed to `Temporal.XX.from` static method.
 */
export interface ParseResult {
	era?: string;
	eraYear?: number;
	year?: number;
	month?: number;
	monthCode?: string;
	day?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
	microsecond?: number;
	nanosecond?: number;
}

/**
 * Locale data.
 * Each property of the locale object corresponds to a format style.
 * For example, `locale.month.format.abbreviated` means 'format' form and 'abbreviated' style months.
 */
export interface LocaleDataForParser {
	era?:
		| {
				abbreviated?: Record<string, string> | undefined;
				wide?: Record<string, string> | undefined;
				narrow?: Record<string, string> | undefined;
		  }
		| undefined;
	month?:
		| {
				format?:
					| {
							abbreviated?: Record<string, string> | string[] | undefined;
							wide?: Record<string, string> | string[] | undefined;
							narrow?: Record<string, string> | string[] | undefined;
					  }
					| undefined;
				standalone?:
					| {
							abbreviated?: Record<string, string> | string[] | undefined;
							wide?: Record<string, string> | string[] | undefined;
							narrow?: Record<string, string> | string[] | undefined;
					  }
					| undefined;
		  }
		| undefined;
	dayPeriod?:
		| {
				abbreviated?: Record<string, string> | undefined;
				wide?: Record<string, string> | undefined;
				narrow?: Record<string, string> | undefined;
		  }
		| undefined;
}

const fieldToRegExpMap = createRecord({
	y: "(?<year>[1-9]\\d*)",
	yyy: "(?<year>\\d{3,})",
	yyyy: "(?<year>\\d{4,})",
	M: "(?<monthNum>[1-9]\\d?)",
	MM: "(?<monthNum>\\d{2})",
	L: "(?<monthNum>[1-9]\\d?)",
	LL: "(?<monthNum>\\d{2})",
	d: "(?<day>[1-9]\\d?)",
	dd: "(?<day>\\d{2})",
	h: "(?<hour12>[1-9]|1[012])",
	hh: "(?<hour12>0[1-9]|1[012])",
	H: "(?<hour>1\\d?|2[0-3]?|\\d)",
	HH: "(?<hour>[01]\\d|2[0-3])",
	K: "(?<hour12>[0-9]|1[01])",
	KK: "(?<hour12>0\\d|1[01])",
	m: "(?<minute>0|[1-9]\\d?)",
	mm: "(?<minute>\\d{2})",
	s: "(?<second>0|[1-9]\\d?)",
	ss: "(?<second>\\d{2})",
});

interface ReverseLookupTable {
	era: Record<string, string>;
	month: Record<string, string | number>;
	dayPeriod: Record<string, string>;
}

function getEraNamesAndLookupTable(
	style: "abbreviated" | "wide" | "narrow",
	localeData: LocaleDataForParser,
): [monthNames: string[], table: ReverseLookupTable["era"]] {
	const eraNamesData = localeData.era?.[style];
	if (!eraNamesData) {
		throw new Error(
			`locale data for ${style} style of the eras is not provided`,
		);
	}
	const table = createRecord<string>();
	const monthNames = [] as string[];

	for (const [monthCode, name] of Object.entries(eraNamesData)) {
		monthNames.push(name);
		table[name] = monthCode;
	}
	return [monthNames, table];
}

function getMonthNamesAndLookupTable(
	form: "format" | "standalone",
	style: "abbreviated" | "wide" | "narrow",
	localeData: LocaleDataForParser,
): [monthNames: string[], table: ReverseLookupTable["month"]] {
	const monthNamesData = localeData.month?.[form]?.[style];
	if (!monthNamesData) {
		throw new Error(
			`locale data for ${form} form + ${style} style of the months is not provided`,
		);
	}
	const table = createRecord<string | number>();
	const monthNames = [] as string[];

	if (Array.isArray(monthNamesData)) {
		monthNamesData.forEach((name, index) => {
			monthNames.push(name);
			table[name] = index + 1;
		});
	} else {
		for (const [monthCode, name] of Object.entries(monthNamesData)) {
			monthNames.push(name);
			table[name] = monthCode;
		}
	}
	return [monthNames, table];
}

function getDayPeriodNamesAndLookupTable(
	style: "abbreviated" | "wide" | "narrow",
	localeData: LocaleDataForParser,
): [monthNames: string[], table: ReverseLookupTable["dayPeriod"]] {
	const dayPeriodData = localeData.dayPeriod?.[style];
	if (!dayPeriodData) {
		throw new Error(
			`locale data for ${style} style of the day periods is not provided`,
		);
	}
	const table = createRecord<string>();
	const dayPeriodNames = [] as string[];

	for (const [dayPeriodId, name] of Object.entries(dayPeriodData)) {
		dayPeriodNames.push(name);
		table[name] = dayPeriodId;
	}
	return [dayPeriodNames, table];
}

function fieldToRegExp(
	field: string,
	localeData: LocaleDataForParser,
	lookupTable: ReverseLookupTable,
) {
	if (fieldToRegExpMap[field] !== undefined) {
		return fieldToRegExpMap[field];
	}
	if (field.startsWith("y")) {
		return `(?<year>\\d{${field.length},})`;
	}
	if (field.startsWith("S")) {
		return `(?<fracSec>\\d{${field.length}})`;
	}

	if (field.length <= 5) {
		const type =
			field.length <= 3
				? "abbreviated"
				: field.length === 4
					? "wide"
					: "narrow";
		if (field.startsWith("G")) {
			const [eraNames, table] = getEraNamesAndLookupTable(type, localeData);
			lookupTable.era = table;
			return `(?<era>${unionRegExp(eraNames)})`;
		}
		if (field.startsWith("M")) {
			const [monthNames, table] = getMonthNamesAndLookupTable(
				"format",
				type,
				localeData,
			);
			lookupTable.month = table;
			return `(?<monthName>${unionRegExp(monthNames)})`;
		}
		if (field.startsWith("L")) {
			const [monthNames, table] = getMonthNamesAndLookupTable(
				"standalone",
				type,
				localeData,
			);
			lookupTable.month = table;
			return `(?<monthName>${unionRegExp(monthNames)})`;
		}
		if (field.startsWith("a")) {
			const [eraNames, table] = getDayPeriodNamesAndLookupTable(
				type,
				localeData,
			);
			lookupTable.dayPeriod = table;
			return `(?<dayPeriod>${unionRegExp(eraNames)})`;
		}
	}
	throw new Error(`Unknown field: ${field}`);
}

function compilePattern(
	pattern: string,
	localeData: LocaleDataForParser,
): [regexp: RegExp, table: ReverseLookupTable] {
	const lookupTable = {
		era: {},
		month: {},
		dayPeriod: {},
	} as ReverseLookupTable;
	let regexpString = "";
	for (const token of tokenize(pattern)) {
		if (token.type === "literal") {
			regexpString += escapeRegExp(token.value);
		} else {
			regexpString += fieldToRegExp(token.value, localeData, lookupTable);
		}
	}
	return [new RegExp(`^${regexpString}$`), lookupTable];
}

/**
 * Return the object parsed from string using the given format string.
 *
 * ```typescript
 * Temporal.PlainDate.from(parse('2/9/2025', 'M/d/yyyy'))
 * // 2025-02-09
 * ```
 *
 * Characters between two single quotes (`'`) in the format are escaped.
 * Two consecutive single quotes (`''`) in the format always represents one single quote (`'`).
 * Letters `A` to `Z` and `a` to `z` are reserved for use as pattern characters, unless they are escaped.
 *
 * Available field patterns are subset of date field symbols in Unicode CLDR,
 * see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table for details.
 *
 * Basically 3 characters' field (e.g. `MMM`) means 'abbreviated' style,
 * 4 characters' field (e.g. `MMMM`) means 'wide' style,
 * 5 characters's field (e.g. `MMMMM`) means 'narrow' style.
 *
 * Available patterns:
 * | unit               | field            | result examples                         |
 * | ------------------ | ---------------- | --------------------------------------- |
 * | era                | G, GG, GGG       | AD, BC                                  |
 * |                    | GGGG             | Anno Domini, Before Christ              |
 * |                    | GGGGG            | A, B                                    |
 * | calendar year      | y                | 2, 20, 201, 2000, 20020                 |
 * |                    | yyy              | 002, 020, 201, 2000, 20020              |
 * |                    | yyyy             | 0002, 0020, 0201, 2000, 20020           |
 * |                    | yyyyy, yyyyyy... | (at least `n` digits with zero-padding) |
 * | month (format)     | M                | 1, 12                                   |
 * |                    | MM               | 01, 12                                  |
 * |                    | MMM              | Jan, Feb, ...                           |
 * |                    | MMMM             | January, February, ...                  |
 * |                    | MMMMM            | J, F, ...                               |
 * | month (standalone) | L                | 1, 12                                   |
 * |                    | LL               | 01, 12                                  |
 * |                    | LLL              | Jan, Feb, ...                           |
 * |                    | LLLL             | January, February, ...                  |
 * |                    | LLLLL            | J, F, ...                               |
 * | day                | d                | 1, 31                                   |
 * |                    | dd               | 01, 31                                  |
 * | AM, PM             | a, aa, aaa       | AM, PM                                  |
 * |                    | aaaa             | a.m., p.m.                              |
 * |                    | aaaaa            | a, p                                    |
 * | hour (1-12)        | h                | 12, 1, 11                               |
 * |                    | hh               | 12, 01, 11                              |
 * | hour (0-23)        | H                | 0, 1, 23                                |
 * |                    | HH               | 00, 01, 23                              |
 * | hour (0-11)        | K                | 0, 1, 11                                |
 * |                    | KK               | 00, 01, 11                              |
 * | minute             | m                | 0, 59                                   |
 * |                    | mm               | 00, 59                                  |
 * | second             | s                | 0, 59                                   |
 * |                    | ss               | 00, 59                                  |
 * | fraction of second | S                | 1, 8                                    |
 * |                    | SS               | 10, 83                                  |
 * |                    | SSS, SSSS...     | (`n` digits)                            |
 *
 * @param dateTimeString string representing a date
 * @param pattern date format pattern string
 * @param localeData optional locale data (required when using non-numeric pattern fields)
 * @returns parse result which can be passed to `Temporal.XX.from` static method.
 */
export function parse(
	dateTimeString: string,
	pattern: string,
	localeData: LocaleDataForParser = {},
): ParseResult {
	const [regexp, table] = compilePattern(pattern, localeData);
	const matchResult = dateTimeString.match(regexp);
	if (matchResult === null) {
		throw new Error(
			`Doesn't match the pattern \`${pattern}\` for the string \`${dateTimeString}\``,
		);
	}
	const matchGroups = matchResult.groups;
	if (matchGroups === undefined) {
		return {};
	}
	const result: ParseResult = {};
	if (matchGroups["era"] !== undefined) {
		const eraId = table.era[matchGroups["era"]];
		if (eraId === undefined) {
			throw new Error("Unknown error");
		}
		result.era = eraId;
	}
	if (matchGroups["year"] !== undefined) {
		if (matchGroups["era"] !== undefined) {
			result.eraYear = parseInt(matchGroups["year"]);
		} else {
			result.year = parseInt(matchGroups["year"]);
		}
	}
	if (matchGroups["monthNum"] !== undefined) {
		result.month = parseInt(matchGroups["monthNum"]);
	}
	if (matchGroups["monthName"] !== undefined) {
		const month = table.month[matchGroups["monthName"]];
		if (month === undefined) {
			throw new Error("Unknown error");
		}
		if (typeof month === "number") {
			result.month = month;
		} else {
			result.monthCode = month;
		}
	}
	if (matchGroups["day"] !== undefined) {
		result.day = parseInt(matchGroups["day"]);
	}
	if (matchGroups["hour"] !== undefined) {
		result.hour = parseInt(matchGroups["hour"]);
	}
	if (matchGroups["hour12"] !== undefined) {
		if (matchGroups["dayPeriod"] === undefined) {
			throw new Error("no day period specified");
		}
		const hour = parseInt(matchGroups["hour12"]);
		const dayPeriodId = table.dayPeriod[matchGroups["dayPeriod"]];
		if (dayPeriodId === undefined) {
			throw new Error("Unknown error");
		}
		if (dayPeriodId === "am") {
			result.hour = hour % 12;
		} else if (dayPeriodId === "pm") {
			result.hour = (hour % 12) + 12;
		} else {
			throw new Error(`day period '${dayPeriodId}' is not supported`);
		}
	}
	if (matchGroups["minute"] !== undefined) {
		const minute = parseInt(matchGroups["minute"]);
		if (minute < 0 || minute >= 60) {
			throw new Error(`minute value is out of range: ${minute}`);
		}
		result.minute = minute;
	}
	if (matchGroups["second"] !== undefined) {
		const second = parseInt(matchGroups["second"]);
		if (second < 0 || second >= 60) {
			throw new Error(`second value is out of range: ${second}`);
		}
		result.second = second;
	}
	if (matchGroups["fracSec"] !== undefined) {
		const fractionalSecondsWithTrailingZero = matchGroups["fracSec"].padEnd(
			9,
			"0",
		);
		result.millisecond = parseInt(
			fractionalSecondsWithTrailingZero.slice(0, 3),
		);
		result.microsecond = parseInt(
			fractionalSecondsWithTrailingZero.slice(3, 6),
		);
		result.nanosecond = parseInt(fractionalSecondsWithTrailingZero.slice(6, 9));
	}
	return result;
}
