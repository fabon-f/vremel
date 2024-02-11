import {
	getConstructor,
	isInstant,
	isPlainDate,
	isPlainDateTime,
	isPlainMonthDay,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { ComparableDateTimeType, Temporal } from "../types.js";

export function compare(
	a: Temporal.Instant,
	b: Temporal.Instant,
): Temporal.ComparisonResult;
export function compare(
	a: Temporal.ZonedDateTime,
	b: Temporal.ZonedDateTime,
): Temporal.ComparisonResult;
export function compare(
	a: Temporal.PlainDate,
	b: Temporal.PlainDate,
): Temporal.ComparisonResult;
export function compare(
	a: Temporal.PlainTime,
	b: Temporal.PlainTime,
): Temporal.ComparisonResult;
export function compare(
	a: Temporal.PlainDateTime,
	b: Temporal.PlainDateTime,
): Temporal.ComparisonResult;
export function compare(
	a: Temporal.PlainYearMonth,
	b: Temporal.PlainYearMonth,
): Temporal.ComparisonResult;
export function compare(
	a: ComparableDateTimeType,
	b: ComparableDateTimeType,
): Temporal.ComparisonResult;
export function compare(a: ComparableDateTimeType, b: ComparableDateTimeType) {
	if (isInstant(a)) {
		if (!isInstant(b)) {
			throw new Error("Unmatched type");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isZonedDateTime(a)) {
		if (!isZonedDateTime(b)) {
			throw new Error("Unmatched type");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isPlainDate(a)) {
		if (!isPlainDate(b)) {
			throw new Error("Unmatched type");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isPlainTime(a)) {
		if (!isPlainTime(b)) {
			throw new Error("Unmatched type");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isPlainDateTime(a)) {
		if (!isPlainDateTime(b)) {
			throw new Error("Unmatched type");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isPlainYearMonth(a)) {
		if (!isPlainYearMonth(b)) {
			throw new Error("Unmatched type");
		}
		return getConstructor(a).compare(a, b);
	}
	if (isPlainMonthDay(a) || isPlainMonthDay(b)) {
		throw new Error("Can't compare PlainMonthDay");
	}
	throw new Error("Unknown type");
}
