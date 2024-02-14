import type { ArrayOf, Temporal } from "../types.js";
import { closestIndexTo } from "./closestIndexTo.js";

/**
 * Returns the closest datetime object to the given datetime object from the passed array.
 * @param dateTimeToCompare the date to compare with
 * @param dateTimes array of datetime objects
 * @returns the closest datetime object
 */
export function closestTo<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dateTimeToCompare: DateTime, dateTimes: ArrayOf<DateTime>): DateTime {
	const ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	if (ret === undefined) {
		throw new Error("Something wrong...");
	}
	return ret as DateTime;
}
