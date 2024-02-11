import { isPlainMonthDay } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { compare } from "./_compare.js";

/**
 * Returns the earliest of the given datetime objects.
 * @param dateTimes array of datetime objects
 * @returns the earliest of the datetime objects
 */
export function earliest(dateTimes: Temporal.Instant[]): Temporal.Instant;
export function earliest(
	dateTimes: Temporal.ZonedDateTime[],
): Temporal.ZonedDateTime;
export function earliest(dateTimes: Temporal.PlainDate[]): Temporal.PlainDate;
export function earliest(dateTimes: Temporal.PlainTime[]): Temporal.PlainTime;
export function earliest(
	dateTimes: Temporal.PlainDateTime[],
): Temporal.PlainDateTime;
export function earliest(
	dateTimes: Temporal.PlainYearMonth[],
): Temporal.PlainYearMonth;
export function earliest(
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
	return dateTimes.reduce((a, b) => (compare(a, b) === 1 ? b : a));
}
