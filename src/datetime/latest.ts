import { isPlainMonthDay } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Returns the latest of the given datetime objects.
 * @param dateTimes array of datetime objects
 * @returns the latest of the datetime objects
 */
export function latest(dateTimes: Temporal.Instant[]): Temporal.Instant;
export function latest(
	dateTimes: Temporal.ZonedDateTime[],
): Temporal.ZonedDateTime;
export function latest(dateTimes: Temporal.PlainDate[]): Temporal.PlainDate;
export function latest(dateTimes: Temporal.PlainTime[]): Temporal.PlainTime;
export function latest(
	dateTimes: Temporal.PlainDateTime[],
): Temporal.PlainDateTime;
export function latest(
	dateTimes: Temporal.PlainYearMonth[],
): Temporal.PlainYearMonth;
export function latest(
	dateTimes:
		| Temporal.Instant[]
		| Temporal.ZonedDateTime[]
		| Temporal.PlainDate[]
		| Temporal.PlainTime[]
		| Temporal.PlainDateTime[]
		| Temporal.PlainYearMonth[],
) {
	if (dateTimes.some(isPlainMonthDay)) {
		throw new Error("Can't compare PlainMonthDay");
	}
	return dateTimes.reduce((a, b) => (compare(a, b) === -1 ? b : a));
}
