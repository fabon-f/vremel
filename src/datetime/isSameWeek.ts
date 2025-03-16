import { assertSameType } from "../assert.js";
import { isPlainDate } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { startOfWeek } from "./startOfWeek.js";

export interface IsSameWeekOptions {
	/**
	 * First day of the week.
	 * For example, in ISO calendar Monday is `1`, Sunday is `7`.
	 */
	firstDayOfWeek: number;
}

function toPlainDate(
	dt: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Temporal.PlainDate {
	return isPlainDate(dt) ? dt : dt.toPlainDate();
}

/**
 * Checks whether the two Temporal objects are in the same week.
 *
 * 'same week' is ambiguous and locale-dependent,
 * so `firstDayOfWeek` option is required.
 *
 * This function supports a calendar with a fixed `daysInWeek`,
 * even if the week contains more or less than 7 days.
 * But it doesn't support a calendar which lacks a fixed number of days.
 *
 * @param dt1 first date time object
 * @param dt2 second date time object
 */
export function isSameWeek<
	DateTime extends
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime,
>(dt1: DateTime, dt2: DateTime, options: IsSameWeekOptions) {
	assertSameType(dt1, dt2);
	const firstDayOfWeek = options.firstDayOfWeek;
	if (
		!Number.isInteger(firstDayOfWeek) ||
		firstDayOfWeek < 1 ||
		firstDayOfWeek > dt1.daysInWeek
	) {
		throw new Error(`${firstDayOfWeek} isn't a valid day of week`);
	}
	if (dt1.calendarId !== dt2.calendarId) {
		throw new Error(
			`Calendar mismatch: ${dt1.calendarId} and ${dt2.calendarId}`,
		);
	}

	const pdt1 = toPlainDate(dt1);
	const pdt2 = toPlainDate(dt2);

	return startOfWeek(pdt1, { firstDayOfWeek }).equals(
		startOfWeek(pdt2, { firstDayOfWeek }),
	);
}
