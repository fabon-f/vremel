import type { Temporal, TemporalType } from "./types.js";

export function isInstant(dt: TemporalType): dt is Temporal.Instant {
	return "epochMilliseconds" in dt && !("timeZoneId" in dt);
}

export function isZonedDateTime(
	dt: TemporalType,
): dt is Temporal.ZonedDateTime {
	return "timeZoneId" in dt;
}

export function isPlainDateTime(
	dt: TemporalType,
): dt is Temporal.PlainDateTime {
	return !("timeZoneId" in dt) && "year" in dt && "second" in dt;
}

export function isPlainTime(dt: TemporalType): dt is Temporal.PlainTime {
	return "second" in dt && !("year" in dt);
}

export function isPlainDate(dt: TemporalType): dt is Temporal.PlainDate {
	return "year" in dt && "day" in dt && !("second" in dt);
}

export function isPlainYearMonth(
	dt: TemporalType,
): dt is Temporal.PlainYearMonth {
	return "year" in dt && !("day" in dt);
}

export function isPlainMonthDay(
	dt: TemporalType,
): dt is Temporal.PlainMonthDay {
	return "day" in dt && !("year" in dt);
}

export function isDuration(dt: TemporalType): dt is Temporal.Duration {
	return "seconds" in dt;
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

export function isInstantConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.Instant {
	return isInstant(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function isZonedDateTimeConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.ZonedDateTime {
	return isZonedDateTime(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function isPlainDateConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.PlainDate {
	return isPlainDate(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function isPlainTimeConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.PlainTime {
	return isPlainTime(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function isPlainDateTimeConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.PlainDateTime {
	return isPlainDateTime(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function isPlainYearMonthConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.PlainYearMonth {
	return isPlainYearMonth(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function isPlainMonthDayConstructor(
	c:
		| typeof Temporal.Instant
		| typeof Temporal.ZonedDateTime
		| typeof Temporal.PlainDate
		| typeof Temporal.PlainTime
		| typeof Temporal.PlainDateTime
		| typeof Temporal.PlainYearMonth
		| typeof Temporal.PlainMonthDay,
): c is typeof Temporal.PlainMonthDay {
	return isPlainMonthDay(c.from("2024-01-01T00:00:00+00:00[Europe/London]"));
}

export function getTypeName(dt: TemporalType) {
	if (isDuration(dt)) {
		return "Temporal.Duration";
	}
	if (isInstant(dt)) {
		return "Temporal.Instant";
	}
	if (isZonedDateTime(dt)) {
		return "Temporal.ZonedDateTime";
	}
	if (isPlainDate(dt)) {
		return "Temporal.PlainDate";
	}
	if (isPlainTime(dt)) {
		return "Temporal.PlainTime";
	}
	if (isPlainDateTime(dt)) {
		return "Temporal.PlainDateTime";
	}
	if (isPlainYearMonth(dt)) {
		return "Temporal.PlainYearMonth";
	}
	if (isPlainMonthDay(dt)) {
		return "Temporal.PlainMonthDay";
	}
	throw new Error("Unknown type");
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
