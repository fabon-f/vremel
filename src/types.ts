import type { Temporal } from "./temporal.d.ts";

export { Temporal };

export type DateTimeType =
	| Temporal.Instant
	| Temporal.ZonedDateTime
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay;
export type TemporalType = DateTimeType | Temporal.Duration;
export type ComparableDateTimeType =
	| Temporal.Instant
	| Temporal.ZonedDateTime
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth;
export type ComparableTemporalType =
	| Temporal.Instant
	| Temporal.ZonedDateTime
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.Duration;

export type ComparableDateTimeTypeArray =
	| Temporal.Instant[]
	| Temporal.ZonedDateTime[]
	| Temporal.PlainDate[]
	| Temporal.PlainTime[]
	| Temporal.PlainDateTime[]
	| Temporal.PlainYearMonth[];

export interface GenericDateConstructor<DateType extends Date = Date> {
	new (value?: Date | number | string): DateType;
	new (
		year: number,
		month: number,
		date?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		ms?: number,
	): DateType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArrayOf<T> = T extends any ? T[] : never;
