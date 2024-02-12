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
import type {
	ComparableDateTimeType,
	ComparableDateTimeTypeArray,
	Temporal,
} from "../types.js";

function maxIndex(array: number[]) {
	return array.indexOf(array.reduce((a, b) => Math.min(a, b)));
}

/**
 * Returns an index of the closest datetime object to the given datetime object from the passed array.
 * @param dateTimeToCompare the date to compare with
 * @param dateTimes array of datetime objects
 * @returns index of the closest datetime
 */
export function closestIndexTo(
	dateTimeToCompare: Temporal.Instant,
	dateTimes: Temporal.Instant[],
): number;
export function closestIndexTo(
	dateTimeToCompare: Temporal.ZonedDateTime,
	dateTimes: Temporal.ZonedDateTime[],
): number;
export function closestIndexTo(
	dateTimeToCompare: Temporal.PlainDate,
	dateTimes: Temporal.PlainDate[],
): number;
export function closestIndexTo(
	dateTimeToCompare: Temporal.PlainTime,
	dateTimes: Temporal.PlainTime[],
): number;
export function closestIndexTo(
	dateTimeToCompare: Temporal.PlainDateTime,
	dateTimes: Temporal.PlainDateTime[],
): number;
export function closestIndexTo(
	dateTimeToCompare: Temporal.PlainYearMonth,
	dateTimes: Temporal.PlainYearMonth[],
): number;
export function closestIndexTo(
	dateTimeToCompare: ComparableDateTimeType,
	dateTimes: ComparableDateTimeTypeArray,
) {
	if (isInstant(dateTimeToCompare) && isInstantArray(dateTimes)) {
		const diff = dateTimes.map((d) =>
			Math.abs(d.epochSeconds - dateTimeToCompare.epochSeconds),
		);
		return maxIndex(diff);
	}
	if (isZonedDateTime(dateTimeToCompare) && isZonedDateTimeArray(dateTimes)) {
		return closestIndexTo(
			dateTimeToCompare.toInstant(),
			dateTimes.map((d) => d.toInstant()),
		);
	}
	if (isPlainDate(dateTimeToCompare) && isPlainDateArray(dateTimes)) {
		const basis = dateTimeToCompare.withCalendar("iso8601");
		const diff = dateTimes.map(
			(d) =>
				basis.since(d.withCalendar("iso8601"), { largestUnit: "day" }).abs()
					.days,
		);
		return maxIndex(diff);
	}
	if (isPlainTime(dateTimeToCompare) && isPlainTimeArray(dateTimes)) {
		const diff = dateTimes.map((d) => dateTimeToCompare.since(d).abs());
		return diff.indexOf(shortest(diff));
	}
	if (isPlainDateTime(dateTimeToCompare) && isPlainDateTimeArray(dateTimes)) {
		const basis = dateTimeToCompare.withCalendar("iso8601");
		const diff = dateTimes.map((d) =>
			basis.since(d.withCalendar("iso8601"), { largestUnit: "hour" }).abs(),
		);
		return diff.indexOf(shortest(diff));
	}
	if (isPlainYearMonth(dateTimeToCompare) && isPlainYearMonthArray(dateTimes)) {
		const diff = dateTimes.map(
			(d) => dateTimeToCompare.since(d, { largestUnit: "month" }).abs().months,
		);
		return maxIndex(diff);
	}
	throw new Error("Invalid arguments");
}
