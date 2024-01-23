import type { Temporal } from './temporal.d.ts'

export type DateTimeType = Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.PlainYearMonth | Temporal.PlainMonthDay

export function isInstant(dt: DateTimeType): dt is Temporal.Instant {
  if ('epochSeconds' in dt && !('timeZoneId' in dt)) {
    return true
  }
  return false
}

export function isZonedDateTime(dt: DateTimeType): dt is Temporal.ZonedDateTime {
  if ('timeZoneId' in dt) {
    return true
  }
  return false
}

export function isPlainDateTime(dt: DateTimeType): dt is Temporal.PlainDateTime {
  if (isZonedDateTime(dt)) {
    return false
  }
  if ('year' in dt && 'second' in dt) {
    return true
  }
  return false
}

export function isPlainTime(dt: DateTimeType): dt is Temporal.PlainTime {
  if ('second' in dt && !('year' in dt)) {
    dt
    return true
  }
  return false
}

export function isPlainDate(dt: DateTimeType): dt is Temporal.PlainDate {
  if ('year' in dt && 'day' in dt && !('second' in dt)) {
    return true
  }
  return false
}

export function isPlainYearMonth(dt: DateTimeType): dt is Temporal.PlainYearMonth {
  if ('year' in dt && !('day' in dt)) {
    return true
  }
  return false
}

export function isPlainMonthDay(dt: DateTimeType): dt is Temporal.PlainMonthDay {
  if ('day' in dt && !('year' in dt)) {
    return true
  }
  return false
}

export function getConstructor(dt: Temporal.Instant): typeof Temporal.Instant
export function getConstructor(dt: Temporal.ZonedDateTime): typeof Temporal.ZonedDateTime
export function getConstructor(dt: Temporal.PlainDate): typeof Temporal.PlainDate
export function getConstructor(dt: Temporal.PlainTime): typeof Temporal.PlainTime
export function getConstructor(dt: Temporal.PlainDateTime): typeof Temporal.PlainDateTime
export function getConstructor(dt: Temporal.PlainYearMonth): typeof Temporal.PlainYearMonth
export function getConstructor(dt: Temporal.PlainMonthDay): typeof Temporal.PlainMonthDay
export function getConstructor(dt: Temporal.Duration): typeof Temporal.Duration
export function getConstructor(dt: DateTimeType | Temporal.Duration) {
  if ('years' in dt) {
    return dt.constructor as unknown as typeof Temporal.Duration
  }
  if (isInstant(dt)) {
    return dt.constructor as unknown as typeof Temporal.Instant
  }
  if (isZonedDateTime(dt)) {
    return dt.constructor as unknown as typeof Temporal.ZonedDateTime
  }
  if (isPlainDate(dt)) {
    return dt.constructor as unknown as typeof Temporal.PlainDate
  }
  if (isPlainTime(dt)) {
    return dt.constructor as unknown as typeof Temporal.PlainTime
  }
  if (isPlainDateTime(dt)) {
    return dt.constructor as unknown as typeof Temporal.PlainDateTime
  }
  if (isPlainYearMonth(dt)) {
    return dt.constructor as unknown as typeof Temporal.PlainYearMonth
  }
  if (isPlainMonthDay(dt)) {
    return dt.constructor as unknown as typeof Temporal.PlainMonthDay
  }
  throw new Error(`Unknown object: ${dt}`)
}
