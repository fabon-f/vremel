import type { Temporal, TemporalType } from "./types.js";

/** @internal */
export function isInstant(dt: TemporalType): dt is Temporal.Instant {
	return dt[Symbol.toStringTag] === "Temporal.Instant";
}

/** @internal */
export function isZonedDateTime(
	dt: TemporalType,
): dt is Temporal.ZonedDateTime {
	return dt[Symbol.toStringTag] === "Temporal.ZonedDateTime";
}

/** @internal */
export function isPlainDateTime(
	dt: TemporalType,
): dt is Temporal.PlainDateTime {
	return dt[Symbol.toStringTag] === "Temporal.PlainDateTime";
}

/** @internal */
export function isPlainTime(dt: TemporalType): dt is Temporal.PlainTime {
	return dt[Symbol.toStringTag] === "Temporal.PlainTime";
}

/** @internal */
export function isPlainDate(dt: TemporalType): dt is Temporal.PlainDate {
	return dt[Symbol.toStringTag] === "Temporal.PlainDate";
}

/** @internal */
export function isPlainYearMonth(
	dt: TemporalType,
): dt is Temporal.PlainYearMonth {
	return dt[Symbol.toStringTag] === "Temporal.PlainYearMonth";
}

/** @internal */
export function isPlainMonthDay(
	dt: TemporalType,
): dt is Temporal.PlainMonthDay {
	return dt[Symbol.toStringTag] === "Temporal.PlainMonthDay";
}

/** @internal */
export function isDuration(dt: TemporalType): dt is Temporal.Duration {
	return dt[Symbol.toStringTag] === "Temporal.Duration";
}

/** @internal */
export function isInstantArray(a: TemporalType[]): a is Temporal.Instant[] {
	return a.every((dt) => isInstant(dt));
}

/** @internal */
export function isZonedDateTimeArray(
	a: TemporalType[],
): a is Temporal.ZonedDateTime[] {
	return a.every((dt) => isZonedDateTime(dt));
}

/** @internal */
export function isPlainDateTimeArray(
	a: TemporalType[],
): a is Temporal.PlainDateTime[] {
	return a.every((dt) => isPlainDateTime(dt));
}

/** @internal */
export function isPlainDateArray(a: TemporalType[]): a is Temporal.PlainDate[] {
	return a.every((dt) => isPlainDate(dt));
}

/** @internal */
export function isPlainTimeArray(a: TemporalType[]): a is Temporal.PlainTime[] {
	return a.every((dt) => isPlainTime(dt));
}

/** @internal */
export function isPlainYearMonthArray(
	a: TemporalType[],
): a is Temporal.PlainYearMonth[] {
	return a.every((dt) => isPlainYearMonth(dt));
}

/** @internal */
export function isPlainMonthDayArray(
	a: TemporalType[],
): a is Temporal.PlainMonthDay[] {
	return a.every((dt) => isPlainMonthDay(dt));
}

/** @internal */
export function isDurationArray(a: TemporalType[]): a is Temporal.Duration[] {
	return a.every((dt) => isDuration(dt));
}

/** @internal */
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

/** @internal */
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

/** @internal */
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

/** @internal */
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

/** @internal */
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

/** @internal */
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

/** @internal */
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

/** @internal */
export function getTypeName(dt: TemporalType): string {
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

/** @internal */
export function getConstructor(dt: Temporal.Instant): typeof Temporal.Instant;
/** @internal */
export function getConstructor(
	dt: Temporal.ZonedDateTime,
): typeof Temporal.ZonedDateTime;
/** @internal */
export function getConstructor(
	dt: Temporal.PlainDate,
): typeof Temporal.PlainDate;
/** @internal */
export function getConstructor(
	dt: Temporal.PlainTime,
): typeof Temporal.PlainTime;
/** @internal */
export function getConstructor(
	dt: Temporal.PlainDateTime,
): typeof Temporal.PlainDateTime;
/** @internal */
export function getConstructor(
	dt: Temporal.PlainYearMonth,
): typeof Temporal.PlainYearMonth;
/** @internal */
export function getConstructor(
	dt: Temporal.PlainMonthDay,
): typeof Temporal.PlainMonthDay;
/** @internal */
export function getConstructor(dt: Temporal.Duration): typeof Temporal.Duration;
export function getConstructor(dt: TemporalType) {
	if (isDuration(dt)) {
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
