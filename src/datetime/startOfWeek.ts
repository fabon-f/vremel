import { isPlainDate } from "../type-utils.js";
import type { Temporal } from "../types.js";

export interface StartOfWeekOptions {
	/**
	 * First day of the week.
	 * For example, in ISO calendar Monday is `1`, Sunday is `7`.
	 */
	firstDayOfWeek: number;
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
	DateTime extends Temporal.PlainDate | Temporal.PlainDateTime,
>(dt: DateTime, options: StartOfWeekOptions): DateTime {
	const firstDayOfWeek = options.firstDayOfWeek;
	if (
		!Number.isInteger(firstDayOfWeek) ||
		firstDayOfWeek < 1 ||
		firstDayOfWeek > dt.daysInWeek
	) {
		throw new Error(`${firstDayOfWeek} isn't a valid day of week`);
	}
	const startOfWeek = dt.subtract({
		days: (dt.dayOfWeek - firstDayOfWeek + dt.daysInWeek) % dt.daysInWeek,
	});

	if (isPlainDate(dt)) {
		return startOfWeek as DateTime;
	}
	return startOfWeek.with({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		microsecond: 0,
		nanosecond: 0,
	}) as DateTime;
}
