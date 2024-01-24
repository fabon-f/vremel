import type { Temporal } from './temporal.d.ts'

export { Temporal }

export type DateTimeType = Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.PlainYearMonth | Temporal.PlainMonthDay
export type TemporalType = DateTimeType | Temporal.Duration
export type ComparableTemporalType = Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.PlainYearMonth | Temporal.Duration
