import type { Temporal } from "../types.js";

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
>(date: Date, TemporalClass: TemporalClassType): InstanceType<TemporalClassType> {
	return TemporalClass.from({
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
		millisecond: date.getMilliseconds(),
	}) as InstanceType<TemporalClassType>;
}
