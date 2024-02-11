import {
	isInstant,
	isPlainDate,
	isPlainDateTime,
	isPlainMonthDay,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { DateTimeType, Temporal } from "../types.js";

export function equals(a: Temporal.Instant, b: Temporal.Instant): boolean;
export function equals(
	a: Temporal.ZonedDateTime,
	b: Temporal.ZonedDateTime,
): boolean;
export function equals(a: Temporal.PlainDate, b: Temporal.PlainDate): boolean;
export function equals(a: Temporal.PlainTime, b: Temporal.PlainTime): boolean;
export function equals(
	a: Temporal.PlainDateTime,
	b: Temporal.PlainDateTime,
): boolean;
export function equals(
	a: Temporal.PlainYearMonth,
	b: Temporal.PlainYearMonth,
): boolean;
export function equals(
	a: Temporal.PlainMonthDay,
	b: Temporal.PlainMonthDay,
): boolean;
export function equals(a: DateTimeType, b: DateTimeType): boolean;
export function equals(a: DateTimeType, b: DateTimeType) {
	if (isInstant(a)) {
		if (!isInstant(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	if (isZonedDateTime(a)) {
		if (!isZonedDateTime(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	if (isPlainDate(a)) {
		if (!isPlainDate(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	if (isPlainTime(a)) {
		if (!isPlainTime(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	if (isPlainDateTime(a)) {
		if (!isPlainDateTime(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	if (isPlainYearMonth(a)) {
		if (!isPlainYearMonth(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	if (isPlainMonthDay(a)) {
		if (!isPlainMonthDay(b)) {
			throw new Error("Unmatched type");
		}
		return a.equals(b);
	}
	throw new Error("Unknown type");
}
