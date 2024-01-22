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
  getConstructor
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
