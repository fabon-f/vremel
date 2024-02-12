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
import { closestIndexTo } from "./closestIndexTo.js";

/**
 * Returns the closest datetime object to the given datetime object from the passed array.
 * @param dateTimeToCompare the date to compare with
 * @param dateTimes array of datetime objects
 * @returns the closest datetime object
 */
export function closestTo(
	dateTimeToCompare: Temporal.Instant,
	dateTimes: Temporal.Instant[],
): Temporal.Instant;
export function closestTo(
	dateTimeToCompare: Temporal.ZonedDateTime,
	dateTimes: Temporal.ZonedDateTime[],
): Temporal.ZonedDateTime;
export function closestTo(
	dateTimeToCompare: Temporal.PlainDate,
	dateTimes: Temporal.PlainDate[],
): Temporal.PlainDate;
export function closestTo(
	dateTimeToCompare: Temporal.PlainTime,
	dateTimes: Temporal.PlainTime[],
): Temporal.PlainTime;
export function closestTo(
	dateTimeToCompare: Temporal.PlainDateTime,
	dateTimes: Temporal.PlainDateTime[],
): Temporal.PlainDateTime;
export function closestTo(
	dateTimeToCompare: Temporal.PlainYearMonth,
	dateTimes: Temporal.PlainYearMonth[],
): Temporal.PlainYearMonth;
export function closestTo(
	dateTimeToCompare: ComparableDateTimeType,
	dateTimes: ComparableDateTimeTypeArray,
) {
	let ret = undefined;
	if (isInstant(dateTimeToCompare) && isInstantArray(dateTimes)) {
		ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	} else if (
		isZonedDateTime(dateTimeToCompare) &&
		isZonedDateTimeArray(dateTimes)
	) {
		ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	} else if (isPlainDate(dateTimeToCompare) && isPlainDateArray(dateTimes)) {
		ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	} else if (isPlainTime(dateTimeToCompare) && isPlainTimeArray(dateTimes)) {
		ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	} else if (
		isPlainDateTime(dateTimeToCompare) &&
		isPlainDateTimeArray(dateTimes)
	) {
		ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	} else if (
		isPlainYearMonth(dateTimeToCompare) &&
		isPlainYearMonthArray(dateTimes)
	) {
		ret = dateTimes[closestIndexTo(dateTimeToCompare, dateTimes)];
	} else {
		throw new Error("Invalid arguments");
	}
	if (ret === undefined) {
		throw new Error("Something wrong...");
	}
	return ret;
}
