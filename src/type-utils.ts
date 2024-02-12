import type { Temporal, TemporalType } from "./types.js";

export function isInstant(dt: TemporalType): dt is Temporal.Instant {
	if ("epochSeconds" in dt && !("timeZoneId" in dt)) {
		return true;
	}
	return false;
}

export function isZonedDateTime(
	dt: TemporalType,
): dt is Temporal.ZonedDateTime {
	if ("timeZoneId" in dt) {
		return true;
	}
	return false;
}

export function isPlainDateTime(
	dt: TemporalType,
): dt is Temporal.PlainDateTime {
	if (isZonedDateTime(dt)) {
		return false;
	}
	if ("year" in dt && "second" in dt) {
		return true;
	}
	return false;
}

export function isPlainTime(dt: TemporalType): dt is Temporal.PlainTime {
	if ("second" in dt && !("year" in dt)) {
		return true;
	}
	return false;
}

export function isPlainDate(dt: TemporalType): dt is Temporal.PlainDate {
	if ("year" in dt && "day" in dt && !("second" in dt)) {
		return true;
	}
	return false;
}

export function isPlainYearMonth(
	dt: TemporalType,
): dt is Temporal.PlainYearMonth {
	if ("year" in dt && !("day" in dt)) {
		return true;
	}
	return false;
}

export function isPlainMonthDay(
	dt: TemporalType,
): dt is Temporal.PlainMonthDay {
	if ("day" in dt && !("year" in dt)) {
		return true;
	}
	return false;
}

export function isDuration(dt: TemporalType): dt is Temporal.Duration {
	if ("seconds" in dt) {
		return true;
	}
	return false;
}

export function isInstantArray(a: TemporalType[]): a is Temporal.Instant[] {
	return a.every((dt) => isInstant(dt));
}

export function isZonedDateTimeArray(
	a: TemporalType[],
): a is Temporal.ZonedDateTime[] {
	return a.every((dt) => isZonedDateTime(dt));
}

export function isPlainDateTimeArray(
	a: TemporalType[],
): a is Temporal.PlainDateTime[] {
	return a.every((dt) => isPlainDateTime(dt));
}

export function isPlainDateArray(a: TemporalType[]): a is Temporal.PlainDate[] {
	return a.every((dt) => isPlainDate(dt));
}

export function isPlainTimeArray(a: TemporalType[]): a is Temporal.PlainTime[] {
	return a.every((dt) => isPlainTime(dt));
}

export function isPlainYearMonthArray(
	a: TemporalType[],
): a is Temporal.PlainYearMonth[] {
	return a.every((dt) => isPlainYearMonth(dt));
}

export function isPlainMonthDayArray(
	a: TemporalType[],
): a is Temporal.PlainMonthDay[] {
	return a.every((dt) => isPlainMonthDay(dt));
}

export function isDurationArray(a: TemporalType[]): a is Temporal.Duration[] {
	return a.every((dt) => isDuration(dt));
}

export function getConstructor(dt: Temporal.Instant): typeof Temporal.Instant;
export function getConstructor(
	dt: Temporal.ZonedDateTime,
): typeof Temporal.ZonedDateTime;
export function getConstructor(
	dt: Temporal.PlainDate,
): typeof Temporal.PlainDate;
export function getConstructor(
	dt: Temporal.PlainTime,
): typeof Temporal.PlainTime;
export function getConstructor(
	dt: Temporal.PlainDateTime,
): typeof Temporal.PlainDateTime;
export function getConstructor(
	dt: Temporal.PlainYearMonth,
): typeof Temporal.PlainYearMonth;
export function getConstructor(
	dt: Temporal.PlainMonthDay,
): typeof Temporal.PlainMonthDay;
export function getConstructor(dt: Temporal.Duration): typeof Temporal.Duration;
export function getConstructor(dt: TemporalType) {
	if ("years" in dt) {
		return dt.constructor as unknown as typeof Temporal.Duration;
	}
	if (isInstant(dt)) {
		return dt.constructor as unknown as typeof Temporal.Instant;
	}
	if (isZonedDateTime(dt)) {
		return dt.constructor as unknown as typeof Temporal.ZonedDateTime;
	}
	if (isPlainDate(dt)) {
		return dt.constructor as unknown as typeof Temporal.PlainDate;
	}
	if (isPlainTime(dt)) {
		return dt.constructor as unknown as typeof Temporal.PlainTime;
	}
	if (isPlainDateTime(dt)) {
		return dt.constructor as unknown as typeof Temporal.PlainDateTime;
	}
	if (isPlainYearMonth(dt)) {
		return dt.constructor as unknown as typeof Temporal.PlainYearMonth;
	}
	if (isPlainMonthDay(dt)) {
		return dt.constructor as unknown as typeof Temporal.PlainMonthDay;
	}
	throw new Error(`Unknown object: ${dt}`);
}
