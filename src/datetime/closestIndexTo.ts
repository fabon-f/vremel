import { shortest } from "../duration/shortest.js";
import {
	isInstant,
	isInstantArray,
	isPlainDate,
	isPlainDateArray,
	isPlainDateTime,
	isPlainDateTimeArray,
	isPlainTime,
	isPlainTimeArray,
	isPlainYearMonth,
	isPlainYearMonthArray,
	isZonedDateTime,
	isZonedDateTimeArray,
} from "../type-utils.js";
import type { ArrayOf, Temporal } from "../types.js";

function minIndex(array: number[]) {
	return array.indexOf(array.reduce((a, b) => Math.min(a, b)));
}

/**
 * Returns an index of the closest datetime object to the given datetime object from the passed array.
 * @param dateTimeToCompare the date to compare with
 * @param dateTimes array of datetime objects
 * @returns index of the closest datetime
 */
export function closestIndexTo<
	DateTime extends
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
>(dateTimeToCompare: DateTime, dateTimes: ArrayOf<DateTime>): number {
	if (isInstant(dateTimeToCompare) && isInstantArray(dateTimes)) {
		const diff = dateTimes.map((d) => dateTimeToCompare.until(d).abs());
		return diff.indexOf(shortest(diff));
	}
	if (isZonedDateTime(dateTimeToCompare) && isZonedDateTimeArray(dateTimes)) {
		return closestIndexTo(
			dateTimeToCompare.toInstant(),
			dateTimes.map((d) => d.toInstant()),
		);
	}
	if (isPlainDate(dateTimeToCompare) && isPlainDateArray(dateTimes)) {
		const diff = dateTimes.map(
			(d) => dateTimeToCompare.until(d, { largestUnit: "day" }).abs().days,
		);
		return minIndex(diff);
	}
	if (isPlainTime(dateTimeToCompare) && isPlainTimeArray(dateTimes)) {
		const diff = dateTimes.map((d) => dateTimeToCompare.until(d).abs());
		return diff.indexOf(shortest(diff));
	}
	if (isPlainDateTime(dateTimeToCompare) && isPlainDateTimeArray(dateTimes)) {
		const diff = dateTimes.map((d) =>
			dateTimeToCompare.until(d, { largestUnit: "hour" }).abs(),
		);
		return diff.indexOf(shortest(diff));
	}
	if (isPlainYearMonth(dateTimeToCompare) && isPlainYearMonthArray(dateTimes)) {
		const diff = dateTimes.map(
			(d) => dateTimeToCompare.until(d, { largestUnit: "month" }).abs().months,
		);
		return minIndex(diff);
	}
	throw new Error("Invalid arguments");
}
