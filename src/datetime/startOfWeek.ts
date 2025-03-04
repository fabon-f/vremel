import { isPlainDate, isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { startOfTimeForZonedDateTime } from "./_startOfTimeForZonedDateTime.js";

export interface StartOfWeekOptions {
	/**
	 * First day of the week.
	 * For example, in ISO calendar Monday is `1`, Sunday is `7`.
	 */
	firstDayOfWeek: number;
}

function startOfWeekWithDayPrecision(
	dt: Temporal.PlainDate,
	firstDayOfWeek: number,
): Temporal.PlainDate;
function startOfWeekWithDayPrecision(
	dt: Temporal.PlainDateTime,
	firstDayOfWeek: number,
): Temporal.PlainDateTime;
function startOfWeekWithDayPrecision(
	dt: Temporal.PlainDate | Temporal.PlainDateTime,
	firstDayOfWeek: number,
) {
	return dt.subtract({
		days: (dt.dayOfWeek - firstDayOfWeek + dt.daysInWeek) % dt.daysInWeek,
	});
}

/**
 * Returns the start of a week for the given datetime.
 * 'start of a week' is ambiguous and locale-dependent,
 * so `firstDayOfWeek` option is required.
 * This function supports a calendar with a fixed `daysInWeek`,
 * even if the week contains more or less than 7 days.
 * But it doesn't support a calendar which lacks a fixed number of days.
 *
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the start of a week
 */
export function startOfWeek<
	DateTime extends
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime,
>(dt: DateTime, options: StartOfWeekOptions): DateTime {
	const firstDayOfWeek = options.firstDayOfWeek;
	if (
		!Number.isInteger(firstDayOfWeek) ||
		firstDayOfWeek < 1 ||
		firstDayOfWeek > dt.daysInWeek
	) {
		throw new Error(`${firstDayOfWeek} isn't a valid day of week`);
	}

	const timeArg = {
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	};

	if (isZonedDateTime(dt)) {
		const startOfWeek = startOfWeekWithDayPrecision(
			dt.toPlainDate(),
			firstDayOfWeek,
		);
		return startOfTimeForZonedDateTime(dt, {
			year: startOfWeek.year,
			month: startOfWeek.month,
			day: startOfWeek.day,
			...timeArg,
		}) as DateTime;
	}

	if (isPlainDate(dt)) {
		return startOfWeekWithDayPrecision(dt, firstDayOfWeek) as DateTime;
	}
	return startOfWeekWithDayPrecision(dt, firstDayOfWeek).with(
		timeArg,
	) as DateTime;
}
