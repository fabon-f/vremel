import type { Temporal } from "./temporal.d.ts";

export type { Temporal };

/** @internal */
export type DateTimeType =
	| Temporal.Instant
	| Temporal.ZonedDateTime
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay;
/** @internal */
export type TemporalType = DateTimeType | Temporal.Duration;
/** @internal */
export type ComparableDateTimeType =
	| Temporal.Instant
	| Temporal.ZonedDateTime
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth;

/**
 * `Date` or extended `Date`
 */
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

/**
 * Similar to `Array`, but with union distribution; `ArrayOf<A | B>` is `A[] | B[]`, not `(A|B)[]`.
 */
export type ArrayOf<T> = T extends unknown ? T[] : never;

/**
 * The object which represents an interval. `start` and `end` should have the same type.
 */
export type Interval<
	DateTime =
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth,
> =
	DateTime extends (
		| Temporal.Instant
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
	) ?
		{ start: DateTime; end: DateTime }
	:	never;
