import type { Temporal } from "../types.js";
import { formatIsoFromDateObject } from "./_formatIsoFromDateObject.js";

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
	const dateIso = formatIsoFromDateObject(date);
	return TemporalClass.from(dateIso) as InstanceType<TemporalClassType>;
}
