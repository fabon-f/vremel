// When Temporal will be stage 4 and TypeScript will add its type definition,
// these definitions will be unnecessary.

export type Instant = {
  epochSeconds: number
  epochMilliseconds: number
  epochMicroseconds: bigint
  epochNanoseconds: bigint
}

export type InstantConstructor = {
  from(thing: any): Instant
  compare(one: Instant | string, two: Instant | string): -1 | 0 | 1
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

export type ZonedDateTimeConstructor = {
  from(thing: any, options?: object): ZonedDateTime
  compare(one: ZonedDateTime | object | string, two: ZonedDateTime | object | string): -1 | 0 | 1
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
  toZonedDateTime(item: {
    plainTime?: object
    timeZone: string | object
  }): ZonedDateTime
}

export type PlainDateConstructor = {
  new(isoYear: number, isoMonth: number, isoDay: number, calendar?: string | object): PlainDate
  from(thing: any, options?: object): PlainDate
  compare(one: PlainDate | object | string, two: PlainDate | object | string): -1 | 0 | 1
}

export type PlainTime = {
  hour: number
  minute: number
  second: number
  millisecond: number
  microsecond: number
  nanosecond: number
  getISOFields(): {
    isoHour: number,
    isoMinute: number,
    isoSecond: number,
    isoMillisecond: number,
    isoMicrosecond: number,
    isoNanosecond: number
  }
  toZonedDateTime(item: { plainDate: object, timeZone: object | string }): ZonedDateTime
}

export type PlainTimeConstructor = {
  from(thing: any, options?: object): PlainTime
  compare(one: PlainTime | object | string, two: PlainTime | object | string): -1 | 0 | 1
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

export type PlainDateTimeConstructor = {
  from(thing: any, options?: object): PlainDateTime
  compare(one: PlainDateTime | object | string, two: PlainDateTime | object | string): -1 | 0 | 1
}

export type PlainYearMonth = {
  year: number
  month: number
  monthCode: string
  era: string | undefined
  eraYear: number | undefined
  daysInMonth: number
  daysInYear: number
  monthsInYear: number
  inLeapYear: boolean
  getISOFields(): {
    isoYear: number,
    isoMonth: number,
    isoDay: number,
    calendar: string | object
  }
  toPlainDate({ day }: { day: number }): PlainDate
}

export type PlainYearMonthConstructor = {
  from(thing: any, options?: object): PlainYearMonth
  compare(one: PlainYearMonth | object | string, two: PlainYearMonth | object | string): -1 | 0 | 1
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
  toPlainDate(options: object): PlainDate
}

export type PlainMonthDayConstructor = {
  from(thing: any, options?: object): PlainMonthDay
  compare(one: PlainMonthDay | object | string, two: PlainMonthDay | object | string): -1 | 0 | 1
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

export type DurationConstructor = {
  from(thing: any): Duration
  compare(one: Duration | object | string, two: Duration | object | string, options?: object) : -1 | 0 | 1
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

export function isPlainMonthDay(dt: DateTimeType): dt is PlainMonthDay {
  if ('day' in dt && !('year' in dt)) {
    return true
  }
  return false
}

export function getConstructor(dt: Instant): InstantConstructor
export function getConstructor(dt: ZonedDateTime): ZonedDateTimeConstructor
export function getConstructor(dt: PlainDate): PlainDateConstructor
export function getConstructor(dt: PlainTime): PlainTimeConstructor
export function getConstructor(dt: PlainDateTime): PlainDateTimeConstructor
export function getConstructor(dt: PlainYearMonth): PlainYearMonthConstructor
export function getConstructor(dt: PlainMonthDay): PlainMonthDayConstructor
export function getConstructor(dt: Duration): DurationConstructor
export function getConstructor(dt: DateTimeType | Duration) {
  if ('years' in dt) {
    return dt.constructor as unknown as DurationConstructor
  }
  if (isInstant(dt)) {
    return dt.constructor as unknown as InstantConstructor
  }
  if (isZonedDateTime(dt)) {
    return dt.constructor as unknown as ZonedDateTimeConstructor
  }
  if (isPlainDate(dt)) {
    return dt.constructor as unknown as PlainDateConstructor
  }
  if (isPlainTime(dt)) {
    return dt.constructor as unknown as PlainTimeConstructor
  }
  if (isPlainDateTime(dt)) {
    return dt.constructor as unknown as PlainDateTimeConstructor
  }
  if (isPlainYearMonth(dt)) {
    return dt.constructor as unknown as PlainYearMonthConstructor
  }
  if (isPlainMonthDay(dt)) {
    return dt.constructor as unknown as PlainMonthDayConstructor
  }
  throw new Error(`Unknown object: ${dt}`)
}
