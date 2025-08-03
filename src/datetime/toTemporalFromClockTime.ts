import type { Temporal } from "../types.js";
import { formatDateTimeIso } from "./_formatDateTimeIso.js";

/**
 * Returns Temporal instance which represents clock (local) time of given date.
 * @param date `Date` object
 * @param TemporalClass Temporal class (such as `Temporal.Plaindate`) which will be returned
 * @returns an instance of Temporal class specified in `temporalClass` argument, which represents the clock time of original date
 */
export function toTemporalFromClockTime<
	TemporalClassType extends
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
>(
	date: Date,
	TemporalClass: TemporalClassType,
): InstanceType<TemporalClassType> {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const millisecond = date.getMilliseconds();
	const dateIso = formatDateTimeIso(
		year,
		month,
		day,
		hour,
		minute,
		second,
		millisecond,
	);
	return TemporalClass.from(dateIso) as InstanceType<TemporalClassType>;
}
