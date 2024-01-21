// When Temporal will be stage 4 and TypeScript will add its type definition,
// these definitions will be unnecessary.

export type Instant = {
  epochSeconds: number
  epochMilliseconds: number
  epochMicroseconds: bigint
  epochNanoseconds: bigint
}

export type ZonedDateTime = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
  microsecond: number
  nanosecond: number
  epochSeconds: number
  epochMilliseconds: number
  epochMicroseconds: bigint
  epochNanoseconds: bigint
  timeZoneId: string
  era: string | undefined
  eraYear: number | undefined
  monthCode: string
  offsetNanoseconds: number
  offset: string
  getISOFields(): {
    isoYear: number,
    isoMonth: number,
    isoDay: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number,
    microsecond: number,
    nanosecond: number,
    offset: string,
    timeZone: string | object,
    calendar: string | object
  }
  toInstant(): Instant
}

export type PlainDate = {
  year: number
  month: number
  monthCode: string
  day: number
  era: string | undefined
  eraYear: number | undefined
  getISOFields(): {
    isoYear: number,
    isoMonth: number,
    isoDay: number,
    calendar: string | object
  }
}

export type PlainTime = {
  hour: number
  minute: number
  second: number
  millisecond: number
  microsecond: number
  nanosecond: number
}

export type PlainDateTime = {
  year: number
  month: number
  monthCode: string
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
  microsecond: number
  nanosecond: number
  calendarId: string
  era: string | undefined
  eraYear: number | undefined
  getISOFields(): {
    isoHour: number,
    isoMinute: number,
    isoSecond: number,
    isoMillisecond: number,
    isoMicrosecond: number,
    isoNanosecond: number
  }
  toZonedDateTime(timeZone: object | string, options?: object): ZonedDateTime
}

export type PlainYearMonth = {
  year: number
  month: number
  monthCode: string
  era: string | undefined
  eraYear: number | undefined
  getISOFields(): {
    isoYear: number,
    isoMonth: number,
    isoDay: number,
    calendar: string | object
  }
}

export type PlainMonthDay = {
  monthCode: string
  day: number
  getISOFields(): {
    isoYear: number,
    isoMonth: number,
    isoDay: number,
    calendar: string | object
  }
}

export type Duration = {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  microseconds: number
  nanoseconds: number
  sign: -1 | 0 | 1
  blank: boolean
}

export type DateTimeType = Instant | ZonedDateTime | PlainDate | PlainTime | PlainDateTime | PlainYearMonth | PlainMonthDay

export function isInstant(dt: DateTimeType): dt is Instant {
  if ('epochSeconds' in dt && !('timeZoneId' in dt)) {
    return true
  }
  return false
}

export function isZonedDateTime(dt: DateTimeType): dt is ZonedDateTime {
  if ('timeZoneId' in dt) {
    return true
  }
  return false
}

export function isPlainDateTime(dt: DateTimeType): dt is PlainDateTime {
  if (isZonedDateTime(dt)) {
    return false
  }
  if ('year' in dt && 'second' in dt) {
    return true
  }
  return false
}

export function isPlainTime(dt: DateTimeType): dt is PlainTime {
  if ('second' in dt && !('year' in dt)) {
    dt
    return true
  }
  return false
}

export function isPlainDate(dt: DateTimeType): dt is PlainDate {
  if ('year' in dt && 'day' in dt && !('second' in dt)) {
    return true
  }
  return false
}

export function isPlainYearMonth(dt: DateTimeType): dt is PlainYearMonth {
  if ('year' in dt && !('day' in dt)) {
    return true
  }
  return false
}

export function isPlainMonthDay(dt: DateTimeType) {
  if ('day' in dt && !('year' in dt)) {
    return true
  }
  return false
}
