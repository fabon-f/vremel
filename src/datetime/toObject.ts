import {
	isPlainDate,
	isPlainDateTime,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { Temporal } from "../types.js";

/**
 * Return value type of `toObject` for `Temporal.ZonedDateTime`.
 * It can be passed to `Temporal.ZonedDateTime.from` method.
 */
export interface ZonedDateTimeLike {
	era: string | undefined;
	eraYear: number | undefined;
	year: number;
	month: number;
	monthCode: string;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	microsecond: number;
	nanosecond: number;
	offset: string;
	timeZone: string;
	calendar: string;
}

/**
 * Return value type of `toObject` for `Temporal.PlainDateTime`.
 * It can be passed to `Temporal.PlainDateTime.from` method.
 */
export interface PlainDateTimeLike {
	era: string | undefined;
	eraYear: number | undefined;
	year: number;
	month: number;
	monthCode: string;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	microsecond: number;
	nanosecond: number;
	calendar: string;
}

/**
 * Return value type of `toObject` for `Temporal.PlainDate`.
 * It can be passed to `Temporal.PlainDate.from` method.
 */
export interface PlainDateLike {
	era: string | undefined;
	eraYear: number | undefined;
	year: number;
	month: number;
	monthCode: string;
	day: number;
	calendar: string;
}

/**
 * Return value type of `toObject` for `Temporal.PlainTime`.
 * It can be passed to `Temporal.PlainTime.from` method.
 */
export interface PlainTimeLike {
	hour: number;
	minute: number;
	second: number;
	millisecond: number;
	microsecond: number;
	nanosecond: number;
}

/**
 * Return value type of `toObject` for `Temporal.PlainYearMonth`.
 * It can be passed to `Temporal.PlainYearMonth.from` method.
 */
export interface PlainYearMonthLike {
	era: string | undefined;
	eraYear: number | undefined;
	year: number;
	month: number;
	monthCode: string;
	calendar: string;
}

/**
 * Return value type of `toObject` for `Temporal.PlainMonthDay`.
 * It can be passed to `Temporal.PlainMonthDay.from` method.
 */
export interface PlainMonthDayLike {
	monthCode: string;
	day: number;
	calendar: string;
}

/**
 * Returns a plain object which can passed to `Temporal.ZonedDateTime.from` to restore original `Temporal.ZonedDateTime`.
 * @param dt original `Temporal.ZonedDateTime` object
 */
export function toObject(dt: Temporal.ZonedDateTime): ZonedDateTimeLike;
/**
 * Returns a plain object which can passed to `Temporal.PlainDateTime.from` to restore original `Temporal.PlainDateTime`.
 * @param dt original `Temporal.PlainDateTime` object
 */
export function toObject(dt: Temporal.PlainDateTime): PlainDateTimeLike;
/**
 * Returns a plain object which can passed to `Temporal.PlainDate.from` to restore original `Temporal.PlainDate`.
 * @param dt original `Temporal.PlainDate` object
 */
export function toObject(dt: Temporal.PlainDate): PlainDateLike;
/**
 * Returns a plain object which can passed to `Temporal.PlainTime.from` to restore original `Temporal.PlainTime`.
 * @param dt original `Temporal.PlainTime` object
 */
export function toObject(dt: Temporal.PlainTime): PlainTimeLike;
/**
 * Returns a plain object which can passed to `Temporal.PlainYearMonth.from` to restore original `Temporal.PlainYearMonth`.
 * @param dt original `Temporal.PlainYearMonth` object
 */
export function toObject(dt: Temporal.PlainYearMonth): PlainYearMonthLike;
/**
 * Returns a plain object which can passed to `Temporal.PlainMonthDay.from` to restore original `Temporal.PlainMonthDay`.
 * @param dt original `Temporal.PlainMonthDay` object
 */
export function toObject(dt: Temporal.PlainMonthDay): PlainMonthDayLike;
export function toObject(
	dt:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
) {
	if (isZonedDateTime(dt)) {
		const result: ZonedDateTimeLike = {
			era: dt.era,
			eraYear: dt.eraYear,
			year: dt.year,
			month: dt.month,
			monthCode: dt.monthCode,
			day: dt.day,
			hour: dt.hour,
			minute: dt.minute,
			second: dt.second,
			millisecond: dt.millisecond,
			microsecond: dt.microsecond,
			nanosecond: dt.nanosecond,
			offset: dt.offset,
			calendar: dt.calendarId,
			timeZone: dt.timeZoneId,
		};
		return result;
	}
	if (isPlainDate(dt)) {
		const result: PlainDateLike = {
			era: dt.era,
			eraYear: dt.eraYear,
			year: dt.year,
			month: dt.month,
			monthCode: dt.monthCode,
			day: dt.day,
			calendar: dt.calendarId,
		};
		return result;
	}
	if (isPlainDateTime(dt)) {
		const result: PlainDateTimeLike = {
			era: dt.era,
			eraYear: dt.eraYear,
			year: dt.year,
			month: dt.month,
			monthCode: dt.monthCode,
			day: dt.day,
			hour: dt.hour,
			minute: dt.minute,
			second: dt.second,
			millisecond: dt.millisecond,
			microsecond: dt.microsecond,
			nanosecond: dt.nanosecond,
			calendar: dt.calendarId,
		};
		return result;
	}
	if (isPlainTime(dt)) {
		const result: PlainTimeLike = {
			hour: dt.hour,
			minute: dt.minute,
			second: dt.second,
			millisecond: dt.millisecond,
			microsecond: dt.microsecond,
			nanosecond: dt.nanosecond,
		};
		return result;
	}
	if (isPlainYearMonth(dt)) {
		const result: PlainYearMonthLike = {
			era: dt.era,
			eraYear: dt.eraYear,
			year: dt.year,
			month: dt.month,
			monthCode: dt.monthCode,
			calendar: dt.calendarId,
		};
		return result;
	}
	const result: PlainMonthDayLike = {
		monthCode: dt.monthCode,
		day: dt.day,
		calendar: dt.calendarId,
	};
	return result;
}
