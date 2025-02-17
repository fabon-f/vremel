import { isPlainDate } from "../type-utils.js";
import type { Temporal } from "../types.js";

export interface EndOfWeekOptions {
	/**
	 * First day of the week.
	 * For example, in ISO calendar Monday is `1`, Sunday is `7`.
	 */
	firstDayOfWeek: number;
}

/**
 * Returns the end of a week for the given datetime.
 * 'end of a week' is ambiguous and locale-dependent,
 * so `firstDayOfWeek` option is required.
 * This function supports a calendar with a fixed `daysInWeek`,
 * even if the week contains more or less than 7 days.
 * But it doesn't support a calendar which lacks a fixed number of days.
 *
 * @param dt datetime object which includes date info
 * @returns Temporal object which represents the end of a week
 */
export function endOfWeek<
	DateTime extends Temporal.PlainDate | Temporal.PlainDateTime,
>(dt: DateTime, options: EndOfWeekOptions): DateTime {
	const firstDayOfWeek = options.firstDayOfWeek;
	if (
		!Number.isInteger(firstDayOfWeek) ||
		firstDayOfWeek < 1 ||
		firstDayOfWeek > dt.daysInWeek
	) {
		throw new Error(`${firstDayOfWeek} isn't a valid day of week`);
	}
	const endOfWeek = dt.add({
		days: (firstDayOfWeek + dt.daysInWeek - dt.dayOfWeek - 1) % dt.daysInWeek,
	});

	if (isPlainDate(dt)) {
		return endOfWeek as DateTime;
	}
	return endOfWeek.with({
		hour: 23,
		minute: 59,
		second: 59,
		millisecond: 999,
		microsecond: 999,
		nanosecond: 999,
	}) as DateTime;
}
