import type { ComparableDateTimeType, Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Checks whether the first datetime is after the second one.
 * @param dateTime datetime object
 * @param dateTimeToCompare datetime object to compare with
 * @returns whether the first datetime is after the second one
 */
export function isAfter(
	dateTime: Temporal.Instant,
	dateTimeToCompare: Temporal.Instant,
): boolean;
export function isAfter(
	dateTime: Temporal.ZonedDateTime,
	dateTimeToCompare: Temporal.ZonedDateTime,
): boolean;
export function isAfter(
	dateTime: Temporal.PlainDate,
	dateTimeToCompare: Temporal.PlainDate,
): boolean;
export function isAfter(
	dateTime: Temporal.PlainTime,
	dateTimeToCompare: Temporal.PlainTime,
): boolean;
export function isAfter(
	dateTime: Temporal.PlainDateTime,
	dateTimeToCompare: Temporal.PlainDateTime,
): boolean;
export function isAfter(
	dateTime: Temporal.PlainYearMonth,
	dateTimeToCompare: Temporal.PlainYearMonth,
): boolean;
export function isAfter(
	dateTime: ComparableDateTimeType,
	dateTimeToCompare: ComparableDateTimeType,
): boolean;
export function isAfter(
	dateTime: ComparableDateTimeType,
	dateTimeToCompare: ComparableDateTimeType,
) {
	return compare(dateTime, dateTimeToCompare) === 1;
}
