import { isZonedDateTime } from "../type-utils.js";
import type { Temporal } from "../types.js";

export interface WithDayOfWeekOptions {
	/**
	 * First day of the week.
	 * For example, in ISO calendar Monday is `1`, Sunday is `7`.
	 */
	firstDayOfWeek: number;
	/**
	 * Same to `disambiguation` option in `Temporal.ZonedDateTime.prototype.with()`.
	 * For other types it will be simply ignored.
	 */
	disambiguation?: "compatible" | "earlier" | "later" | "reject";
	/**
	 * Same to `offset` option in `Temporal.ZonedDateTime.prototype.with()`.
	 * For other types it will be simply ignored.
	 */
	offset?: "use" | "prefer" | "ignore" | "reject";
}

function withDayOfWeekForClockTime(
	dt: Temporal.PlainDate | Temporal.PlainDateTime,
	dayOfWeek: number,
	firstDayOfWeek: number,
): Temporal.PlainDate | Temporal.PlainDateTime {
	const current =
		(dt.dayOfWeek - firstDayOfWeek + dt.daysInWeek) % dt.daysInWeek;
	const target = (dayOfWeek - firstDayOfWeek + dt.daysInWeek) % dt.daysInWeek;
	return dt.add({ days: target - current });
}

/**
 * Returns the datetime in the same week with specified day of a week.
 *
 * For `ZonedDateTime` this function behave like `Temporal.ZonedDateTime.prototype.with()`.
 * As well as `Temporal.ZonedDateTime.prototype.with()`,
 * for some edge cases with forward offset transition around midnight,
 * the result can be previous or next day of the desired day depending on the `disambiguation` option.
 *
 * ```typescript
 * // In Greenland 2024-03-30T23:10:00 doesn't exist due to DST
 * Temporal.ZonedDateTime.from("2024-03-29T23:10:00-02:00[America/Nuuk]")
 *   .with({ day: 30 }); // 2024-03-31T00:10:00-01:00, not March 30!
 * // `withDayOfWeek` does the same thing
 * withDayOfWeek(
 *   Temporal.ZonedDateTime.from("2024-03-29T23:10:00-02:00[America/Nuuk]"),
 *   6, // Saturday
 *   { firstDayOfWeek: 1 }
 * ); // 2024-03-31T00:10:00-01:00, Sunday!
 * ```
 *
 * 'same week' is ambiguous and locale-dependent,
 * so `firstDayOfWeek` option is required.
 *
 * This function supports a calendar with a fixed `daysInWeek`,
 * even if the week contains more or less than 7 days.
 * But it doesn't support a calendar which lacks a fixed number of days.
 */
export function withDayOfWeek<
	DateTime extends
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime,
>(dt: DateTime, dayOfWeek: number, options: WithDayOfWeekOptions): DateTime {
	const firstDayOfWeek = options.firstDayOfWeek;
	if (
		!Number.isInteger(firstDayOfWeek) ||
		firstDayOfWeek < 1 ||
		firstDayOfWeek > dt.daysInWeek
	) {
		throw new Error(`${firstDayOfWeek} isn't a valid day of week`);
	}
	if (isZonedDateTime(dt)) {
		const date = withDayOfWeekForClockTime(
			dt.toPlainDate(),
			dayOfWeek,
			firstDayOfWeek,
		);
		return dt.with(
			{
				year: date.year,
				month: date.month,
				day: date.day,
			},
			// TODO: remove `@ts-expect-error`
			// @ts-expect-error `exactOptionalPropertyTypes` problem
			{ disambiguation: options.disambiguation, offset: options.offset },
		) as DateTime;
	}
	return withDayOfWeekForClockTime(dt, dayOfWeek, firstDayOfWeek) as DateTime;
}
