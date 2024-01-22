import { expect, test } from 'vitest'
import { Temporal as Temporal1 } from 'temporal-polyfill'
import { Temporal as Temporal2 } from '@js-temporal/polyfill'
import {
  isInstant,
  isZonedDateTime,
  isPlainDateTime,
  isPlainDate,
  isPlainTime,
  isPlainYearMonth,
  isPlainMonthDay,
  getConstructor,
  type Instant,
  type ZonedDateTime,
  type PlainDateTime,
  type PlainDate,
  type PlainTime,
  type PlainYearMonth,
  type PlainMonthDay
} from './temporal-types.js'

function createTypes(temporal: any) {
  return [
    temporal.Now.instant(),
    temporal.Now.zonedDateTimeISO(),
    temporal.Now.plainDateTimeISO(),
    temporal.Now.plainDateISO(),
    temporal.Now.plainTimeISO(),
    temporal.Now.plainDateISO().toPlainYearMonth(),
    temporal.Now.plainDateISO().toPlainMonthDay()
  ]
}

test('isInstant', () => {
  const expected = [true, false, false, false, false, false, false]
  expect(createTypes(Temporal1).map(v => isInstant(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isInstant(v))).toEqual(expected)
})

test('isZonedDateTime', () => {
  const expected = [false, true, false, false, false, false, false]
  expect(createTypes(Temporal1).map(v => isZonedDateTime(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isZonedDateTime(v))).toEqual(expected)
})

test('isPlainDateTime', () => {
  const expected = [false, false, true, false, false, false, false]
  expect(createTypes(Temporal1).map(v => isPlainDateTime(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isPlainDateTime(v))).toEqual(expected)
})

test('isPlainDate', () => {
  const expected = [false, false, false, true, false, false, false]
  expect(createTypes(Temporal1).map(v => isPlainDate(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isPlainDate(v))).toEqual(expected)
})

test('isPlainTime', () => {
  const expected = [false, false, false, false, true, false, false]
  expect(createTypes(Temporal1).map(v => isPlainTime(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isPlainTime(v))).toEqual(expected)
})

test('isPlainYearMonth', () => {
  const expected = [false, false, false, false, false, true, false]
  expect(createTypes(Temporal1).map(v => isPlainYearMonth(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isPlainYearMonth(v))).toEqual(expected)
})

test('isPlainMonthDay', () => {
  const expected = [false, false, false, false, false, false, true]
  expect(createTypes(Temporal1).map(v => isPlainMonthDay(v))).toEqual(expected)
  expect(createTypes(Temporal2).map(v => isPlainMonthDay(v))).toEqual(expected)
})

test('getConstructor', () => {
  const createExpected = (Temporal: any) => [
    Temporal.Instant,
    Temporal.ZonedDateTime,
    Temporal.PlainDateTime,
    Temporal.PlainDate,
    Temporal.PlainTime,
    Temporal.PlainYearMonth,
    Temporal.PlainMonthDay
  ]
  expect(createTypes(Temporal1).map(v => getConstructor(v))).toEqual(createExpected(Temporal1))
  expect(createTypes(Temporal2).map(v => getConstructor(v))).toEqual(createExpected(Temporal2))
  expect(getConstructor(Temporal1.Duration.from({ seconds: 10 }))).toEqual(Temporal1.Duration)
  expect(getConstructor(Temporal2.Duration.from({ seconds: 10 }))).toEqual(Temporal2.Duration)
})

test('type compatibility', () => {
  const testFunc = (
    _1: Instant,
    _2: ZonedDateTime,
    _3: PlainDateTime,
    _4: PlainDate,
    _5: PlainTime,
    _6: PlainYearMonth,
    _7: PlainMonthDay
  ) => {}
  testFunc(
    Temporal1.Now.instant(),
    Temporal1.Now.zonedDateTimeISO(),
    Temporal1.Now.plainDateTimeISO(),
    Temporal1.Now.plainDateISO(),
    Temporal1.Now.plainTimeISO(),
    Temporal1.Now.plainDateISO().toPlainYearMonth(),
    Temporal1.Now.plainDateISO().toPlainMonthDay()
  )
  testFunc(
    Temporal2.Now.instant(),
    Temporal2.Now.zonedDateTimeISO(),
    Temporal2.Now.plainDateTimeISO(),
    Temporal2.Now.plainDateISO(),
    Temporal2.Now.plainTimeISO(),
    Temporal2.Now.plainDateISO().toPlainYearMonth(),
    Temporal2.Now.plainDateISO().toPlainMonthDay()
  )
})
