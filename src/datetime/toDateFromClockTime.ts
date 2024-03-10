import { UTCDateMini } from "@date-fns/utc";

import {
	isPlainDate,
	isPlainMonthDay,
	isPlainTime,
	isPlainYearMonth,
	isZonedDateTime,
} from "../type-utils.js";
import type { GenericDateConstructor, Temporal } from "../types.js";

/**
 * Returns `Date` which represents clock (local) time of given temporal object,
 * dropping timezone and calendar information.
 * When you pass `ZonedDateTime`, clock time will be unchanged but exact time will change.
 * This function is useful when you want to use formatting functions of "date-fns".
 * You can pass `DateConstructor` parameter to specify a constructor to build the date to return,
 * but passing JavaScript's `Date` is **strongly discouraged** because `Date` is a hotbed of timezone troubles.
 *
 * @param dateTime datetime object
 */
export function toDateFromClockTime(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
): UTCDateMini;

/**
 * @param dateTime datetime object
 * @param DateConstructor constructor of return value, `UTCDateMini` from "@date-fns/utc" as default
 */
export function toDateFromClockTime<DateType extends Date>(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
	DateConstructor: GenericDateConstructor<DateType>,
): DateType;
export function toDateFromClockTime<DateType extends Date>(
	dateTime:
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay,
	DateConstructor?: GenericDateConstructor<DateType>,
) {
	const DateConstructorFunction = DateConstructor ?? UTCDateMini;
	if (isPlainYearMonth(dateTime) || isPlainMonthDay(dateTime)) {
		const { isoYear, isoMonth, isoDay } = dateTime.getISOFields();
		return new DateConstructorFunction(isoYear, isoMonth - 1, isoDay);
	}
	if (isPlainTime(dateTime)) {
		const { isoHour, isoMinute, isoSecond, isoMillisecond } =
			dateTime.getISOFields();
		// Set default date to 2000-01-01
		return new DateConstructorFunction(
			2000,
			0,
			1,
			isoHour,
			isoMinute,
			isoSecond,
			isoMillisecond,
		);
	}
	const plainDateTime = isZonedDateTime(dateTime)
		? dateTime.toPlainDateTime()
		: isPlainDate(dateTime)
			? dateTime.toPlainDateTime()
			: dateTime;
	const {
		isoYear,
		isoMonth,
		isoDay,
		isoHour,
		isoMinute,
		isoSecond,
		isoMillisecond,
	} = plainDateTime.getISOFields();
	return new (DateConstructor ?? UTCDateMini)(
		isoYear,
		isoMonth - 1,
		isoDay,
		isoHour,
		isoMinute,
		isoSecond,
		isoMillisecond,
	);
}
