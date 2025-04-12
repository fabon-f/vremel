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

/** @internal */
export function isEqual(a: Temporal.Instant, b: Temporal.Instant): boolean;
/** @internal */
export function isEqual(
	a: Temporal.ZonedDateTime,
	b: Temporal.ZonedDateTime,
): boolean;
/** @internal */
export function isEqual(a: Temporal.PlainDate, b: Temporal.PlainDate): boolean;
/** @internal */
export function isEqual(a: Temporal.PlainTime, b: Temporal.PlainTime): boolean;
/** @internal */
export function isEqual(
	a: Temporal.PlainDateTime,
	b: Temporal.PlainDateTime,
): boolean;
/** @internal */
export function isEqual(
	a: Temporal.PlainYearMonth,
	b: Temporal.PlainYearMonth,
): boolean;
/** @internal */
export function isEqual(
	a: Temporal.PlainMonthDay,
	b: Temporal.PlainMonthDay,
): boolean;
/** @internal */
export function isEqual(a: DateTimeType, b: DateTimeType): boolean;
export function isEqual(a: DateTimeType, b: DateTimeType) {
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
