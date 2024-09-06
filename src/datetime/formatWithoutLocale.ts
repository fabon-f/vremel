import { getTypeName, isPlainMonthDay } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { secondsToHms } from "./_secondsToHms.js";

type DateTime =
	| Temporal.ZonedDateTime
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay;

function year(
	dateTime: DateTime,
	token: string,
	formatNonIsoDate: boolean,
): string {
	if (!("year" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have year info`);
	}
	if (!formatNonIsoDate && dateTime.calendarId !== "iso8601") {
		throw new Error("You can't format a year of non-ISO date");
	}
	const year = dateTime.year.toString();
	if (token === "y") {
		return year;
	}
	if (token === "yy") {
		return (dateTime.year % 100).toString().padStart(2, "0");
	}
	if (/^y+$/.test(token)) {
		if (token.length > year.length) {
			return year.padStart(token.length, "0");
		} else {
			return year;
		}
	}
	throw new Error(`Invalid token: ${token}`);
}

function getNumericMonth(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
) {
	if (isPlainMonthDay(dateTime)) {
		if (dateTime.calendarId === "iso8601") {
			const index = [
				"M01",
				"M02",
				"M03",
				"M04",
				"M05",
				"M06",
				"M07",
				"M08",
				"M09",
				"M10",
				"M11",
				"M12",
			].indexOf(dateTime.monthCode);
			if (index === -1) {
				throw new Error(`Unknown month code: ${dateTime.monthCode}`);
			}
			return index + 1;
		}
		throw new Error(
			`Can't get numeric month of PlainMonthDay with non-ISO calendars`,
		);
	}
	return dateTime.month;
}

function month(
	dateTime: DateTime,
	token: string,
	formatNonIsoDate: boolean,
): string {
	if (!("monthCode" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have month info`);
	}
	if (!formatNonIsoDate && dateTime.calendarId !== "iso8601") {
		throw new Error("You can't format a month of non-ISO date");
	}
	const month = getNumericMonth(dateTime);
	if (token === "M") {
		return month.toString();
	}
	if (token === "MM") {
		return month.toString().padStart(2, "0");
	}

	throw new Error(`Invalid token: ${token}`);
}

function day(
	dateTime: DateTime,
	token: string,
	formatNonIsoDate: boolean,
): string {
	if (!("day" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have day info`);
	}
	if (!formatNonIsoDate && dateTime.calendarId !== "iso8601") {
		throw new Error("You can't format a month of non-ISO date");
	}
	if (token === "d") {
		return dateTime.day.toString();
	}
	if (token === "dd") {
		return dateTime.day.toString().padStart(2, "0");
	}
	throw new Error(`Invalid token: ${token}`);
}

function hour(dateTime: DateTime, token: string): string {
	if (!("hour" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have hour info`);
	}
	const hour12 = (
		dateTime.hour % 12 === 0 ? 12 : dateTime.hour % 12
	).toString();
	if (token === "h") {
		return hour12;
	}
	if (token === "hh") {
		return hour12.padStart(2, "0");
	}
	if (token === "H") {
		return dateTime.hour.toString();
	}
	if (token === "HH") {
		return dateTime.hour.toString().padStart(2, "0");
	}
	throw new Error(`Invalid token: ${token}`);
}

function minute(dateTime: DateTime, token: string): string {
	if (!("minute" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have minute info`);
	}
	if (token === "m") {
		return dateTime.minute.toString();
	}
	if (token === "mm") {
		return dateTime.minute.toString().padStart(2, "0");
	}
	throw new Error(`Invalid token: ${token}`);
}

function second(dateTime: DateTime, token: string): string {
	if (!("second" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have second info`);
	}
	if (token === "s") {
		return dateTime.second.toString();
	}
	if (token === "ss") {
		return dateTime.second.toString().padStart(2, "0");
	}
	throw new Error(`Invalid token: ${token}`);
}

function fractionalSecond(dateTime: DateTime, token: string): string {
	if (
		!(
			"millisecond" in dateTime &&
			"nanosecond" in dateTime &&
			"microsecond" in dateTime
		)
	) {
		throw new Error(
			`${getTypeName(dateTime)} doesn't have fractional second info`,
		);
	}
	if (!/^S+$/.test(token)) {
		throw new Error(`Invalid token: ${token}`);
	}
	const millisec = dateTime.millisecond.toString().padStart(3, "0");
	const microsec = dateTime.microsecond.toString().padStart(3, "0");
	const nanosec = dateTime.nanosecond.toString().padStart(3, "0");
	const fracSec = `${millisec}${microsec}${nanosec}`;

	if (token.length >= fracSec.length) {
		return fracSec.padEnd(token.length, "0");
	} else {
		return fracSec.slice(0, token.length);
	}
}

function offset(dateTime: DateTime, token: string) {
	if (!("offsetNanoseconds" in dateTime)) {
		throw new Error(
			`${getTypeName(dateTime)} doesn't have timezone and offset info`,
		);
	}
	const offsetSeconds = Math.floor(dateTime.offsetNanoseconds / 1e9);
	if (offsetSeconds === 0 && /^X{1,5}$/.test(token)) {
		return "Z";
	}
	const sign = offsetSeconds < 0 ? "-" : "+";
	const hms = secondsToHms(Math.abs(offsetSeconds));
	const hour = hms.hour.toString().padStart(2, "0");
	const minute = hms.minute.toString().padStart(2, "0");
	const second = hms.second.toString().padStart(2, "0");
	if (token === "X" || token === "x") {
		return hms.minute === 0 ? `${sign}${hour}` : `${sign}${hour}${minute}`;
	}
	if (token === "XX" || token === "xx") {
		return `${sign}${hour}${minute}`;
	}
	if (token === "XXX" || token === "xxx") {
		return `${sign}${hour}:${minute}`;
	}
	if (token === "XXXX" || token === "xxxx") {
		return hms.second === 0
			? `${sign}${hour}${minute}`
			: `${sign}${hour}${minute}${second}`;
	}
	if (token === "XXXXX" || token === "xxxxx") {
		return hms.second === 0
			? `${sign}${hour}:${minute}`
			: `${sign}${hour}:${minute}:${second}`;
	}
	throw new Error(`Invalid token: ${token}`);
}

function formatToken(
	dateTime: DateTime,
	token: string,
	formatNonIsoDate: boolean,
) {
	if (/^y+$/.test(token)) {
		return year(dateTime, token, formatNonIsoDate);
	}
	if (token === "M" || token === "MM") {
		return month(dateTime, token, formatNonIsoDate);
	}
	if (token === "d" || token === "dd") {
		return day(dateTime, token, formatNonIsoDate);
	}
	if (token === "h" || token === "hh" || token === "H" || token === "HH") {
		return hour(dateTime, token);
	}
	if (token === "m" || token === "mm") {
		return minute(dateTime, token);
	}
	if (token === "s" || token === "ss") {
		return second(dateTime, token);
	}
	if (/^S+$/.test(token)) {
		return fractionalSecond(dateTime, token);
	}
	if (/^(x{1,5}|X{1,5})$/.test(token)) {
		return offset(dateTime, token);
	}
	throw new Error(`Invalid token: ${token}`);
}

function areSingleQuotesBalanced(format: string) {
	let count = 0;
	for (const char of [...format]) {
		if (char === `'`) {
			count++;
		}
	}
	return count % 2 === 0;
}

function unescapeTwoSingleQuotes(format: string) {
	return format.replaceAll(`''`, `'`);
}

export interface FormatWithoutLocaleOptions {
	/**
	 * whether format numeric year/month/day for non-ISO calendar
	 */
	formatNonIsoDate?: boolean;
}

/**
 * Returns formatted date string of the Temporal object in the given format.
 * When formatting year, month, or day, this function only accepts a temporal object with ISO calendar by default.
 * If you are 100% sure what you are doing and want to format numeric date info of non-ISO date intentionally,
 * pass `formatNonIsoDate` option.
 *
 * Available field patterns are subset of date field symbols in Unicode CLDR,
 * see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table for details.
 *
 * Available patterns:
 * | unit               | pattern          | result examples                         |
 * | ------------------ | ---------------- | --------------------------------------- |
 * | calendar year      | y                | 2, 20, 201, 2000, 20020                 |
 * |                    | yy               | 02, 20, 01, 00, 20                      |
 * |                    | yyy              | 002, 020, 201, 2000, 20020              |
 * |                    | yyyy             | 0002, 0020, 0201, 2000, 20020           |
 * |                    | yyyyy, yyyyyy... | (at least `n` digits with zero-padding) |
 * | month              | M                | 1, 12                                   |
 * |                    | MM               | 01, 12                                  |
 * | day                | d                | 1, 31                                   |
 * |                    | dd               | 01, 31                                  |
 * | hour (1-12)        | h                | 12, 1, 11                               |
 * |                    | hh               | 12, 01, 11                              |
 * | hour (0-23)        | H                | 0, 1, 23                                |
 * |                    | HH               | 00, 01, 23                              |
 * | minute             | m                | 0, 59                                   |
 * |                    | mm               | 00, 59                                  |
 * | second             | s                | 0, 59                                   |
 * |                    | ss               | 00, 59                                  |
 * | fraction of second | S                | 1, 8                                    |
 * |                    | SS               | 10, 83                                  |
 * |                    | SSS, SSSS...     | (`n` digits)                            |
 * | timezone offset    | x                | -08, +0530, +00                         |
 * |                    | xx               | -0800, +0530, +0000                     |
 * |                    | xxx              | -08:00, +05:30, +00:00                  |
 * |                    | xxxx             | -0800, +0530, +0000, +123456            |
 * |                    | xxxxx            | -08:00, +05:30, +00:00, +12:34:56       |
 * | timezone offset    | X                | -08, +0530, Z                           |
 * |                    | XX               | -0800, +0530, Z                         |
 * |                    | XXX              | -08:00, +05:30, Z                       |
 * |                    | XXXX             | -0800, +0530, Z, +123456                |
 * |                    | XXXXX            | -08:00, +05:30, Z, +12:34:56            |
 *
 * @param dateTime Temporal object
 * @param format pattern string
 * @returns formatted date
 */
export function formatWithoutLocale(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
	format: string,
	options?: FormatWithoutLocaleOptions,
): string {
	if (!areSingleQuotesBalanced(format)) {
		throw new Error(
			"Unbalanced single quotes. Use single quotes for escaping and two single quotes to represent actual single quote.",
		);
	}
	const regex = /''|'(''|[^'])+'|y+|M+|d+|h+|H+|m+|s+|S+|x+|X+/g;
	return format.replace(regex, (match) => {
		if (match === `''`) {
			return `'`;
		}
		if (match.startsWith(`'`) && match.endsWith(`'`)) {
			return unescapeTwoSingleQuotes(match.slice(1, match.length - 1));
		}
		return formatToken(dateTime, match, options?.formatNonIsoDate ?? false);
	});
}
