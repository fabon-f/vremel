import {
	getConstructor,
	getTypeName,
	isInstant,
	isPlainDate,
	isPlainDateTime,
	isPlainMonthDay,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { ComparableDateTimeType, Temporal } from "../types.js";

/** @internal */
export function compare(a: Temporal.Instant, b: Temporal.Instant): 1 | 0 | -1;
/** @internal */
export function compare(a: Temporal.ZonedDateTime, b: Temporal.ZonedDateTime): 1 | 0 | -1;
/** @internal */
export function compare(a: Temporal.PlainDate, b: Temporal.PlainDate): 1 | 0 | -1;
/** @internal */
export function compare(a: Temporal.PlainTime, b: Temporal.PlainTime): 1 | 0 | -1;
/** @internal */
export function compare(a: Temporal.PlainDateTime, b: Temporal.PlainDateTime): 1 | 0 | -1;
/** @internal */
export function compare(a: Temporal.PlainYearMonth, b: Temporal.PlainYearMonth): 1 | 0 | -1;
/** @internal */
export function compare(a: ComparableDateTimeType, b: ComparableDateTimeType): 1 | 0 | -1;
export function compare(a: ComparableDateTimeType, b: ComparableDateTimeType) {
	if (isInstant(a) && isInstant(b)) {
		return getConstructor(a).compare(a, b);
	}
	if (isZonedDateTime(a) && isZonedDateTime(b)) {
		return getConstructor(a).compare(a, b);
	}
	if (isPlainDate(a) && isPlainDate(b)) {
		return getConstructor(a).compare(a, b);
	}
	if (isPlainTime(a) && isPlainTime(b)) {
		return getConstructor(a).compare(a, b);
	}
	if (isPlainDateTime(a) && isPlainDateTime(b)) {
		return getConstructor(a).compare(a, b);
	}
	if (isPlainYearMonth(a) && isPlainYearMonth(b)) {
		if (a.calendarId !== b.calendarId) {
			throw new Error("Can't compare PlainYearMonth with different calendar");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isPlainMonthDay(a) || isPlainMonthDay(b)) {
		throw new Error("Can't compare PlainMonthDay");
	}
	throw new Error(`Can't compare ${getTypeName(a)} and ${getTypeName(b)}`);
}
