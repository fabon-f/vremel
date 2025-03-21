import {
	getTypeName,
	isPlainMonthDay,
	isZonedDateTime,
} from "../type-utils.js";
import type { Temporal } from "../types.js";
import { replaceToken } from "./_ldmrDatePattern.js";
import { padLeadingZeros } from "./_padLeadingZeros.js";
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
		return padLeadingZeros(dateTime.year % 100, 2);
	}
	if (/^y+$/.test(token)) {
		if (token.length > year.length) {
			return padLeadingZeros(year, token.length);
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
		return padLeadingZeros(month, 2);
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
		return padLeadingZeros(dateTime.day, 2);
	}
	throw new Error(`Invalid token: ${token}`);
}

function hour(dateTime: DateTime, token: string): string {
	if (!("hour" in dateTime)) {
		throw new Error(`${getTypeName(dateTime)} doesn't have hour info`);
	}
	const hour12 = dateTime.hour % 12 === 0 ? 12 : dateTime.hour % 12;
	if (token === "h") {
		return hour12.toString();
	}
	if (token === "hh") {
		return padLeadingZeros(hour12, 2);
	}
	if (token === "H") {
		return dateTime.hour.toString();
	}
	if (token === "HH") {
		return padLeadingZeros(dateTime.hour, 2);
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
		return padLeadingZeros(dateTime.minute, 2);
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
		return padLeadingZeros(dateTime.second, 2);
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
	const millisec = padLeadingZeros(dateTime.millisecond, 3);
	const microsec = padLeadingZeros(dateTime.microsecond, 3);
	const nanosec = padLeadingZeros(dateTime.nanosecond, 3);
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
	const [hour, minute, second] = secondsToHms(Math.abs(offsetSeconds));
	const hourStr = padLeadingZeros(hour, 2);
	const minuteStr = padLeadingZeros(minute, 2);
	const secondStr = padLeadingZeros(second, 2);
	if (token === "X" || token === "x") {
		return minute === 0 ? `${sign}${hourStr}` : `${sign}${hourStr}${minuteStr}`;
	}
	if (token === "XX" || token === "xx") {
		return `${sign}${hourStr}${minuteStr}`;
	}
	if (token === "XXX" || token === "xxx") {
		return `${sign}${hourStr}:${minuteStr}`;
	}
	if (token === "XXXX" || token === "xxxx") {
		return second === 0 ?
				`${sign}${hourStr}${minuteStr}`
			:	`${sign}${hourStr}${minuteStr}${secondStr}`;
	}
	if (token === "XXXXX" || token === "xxxxx") {
		return second === 0 ?
				`${sign}${hourStr}:${minuteStr}`
			:	`${sign}${hourStr}:${minuteStr}:${secondStr}`;
	}
	throw new Error(`Invalid token: ${token}`);
}

function timeZoneId(dateTime: DateTime) {
	if (!isZonedDateTime(dateTime)) {
		throw new Error(
			`${getTypeName(dateTime)} doesn't have timezone and offset info`,
		);
	}
	return dateTime.timeZoneId;
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
	if (token === "VV") {
		return timeZoneId(dateTime);
	}
	throw new Error(`Invalid token: ${token}`);
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
 * Characters between two single quotes (`'`) in the format are escaped.
 * Two consecutive single quotes (`''`) in the format always represents one single quote (`'`).
 * Letters `A` to `Z` and `a` to `z` are reserved for use as pattern characters, unless they are escaped.
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
 * | time zone ID       | VV               | Europe/London, Etc/GMT+1                |
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
	return replaceToken(format, (token) =>
		formatToken(dateTime, token, options?.formatNonIsoDate ?? false),
	);
}
