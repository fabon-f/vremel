import { isInstant } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { getDayOfWeekAbbreviationFromNumber } from "./_getDayOfWeekAbbreviationFromNumber.js";
import { getMonthAbbreviationFromNumber } from "./_getMonthAbbreviationFromNumber.js";

/**
 * Returns a string in RFC 7231's format which represents an exact time of given temporal object.
 *
 * @param dt temporal object which includes exact time info (`Instant` and `ZonedDateTime`)
 * @returns a string formatted according to RFC 7231
 */
export function formatRfc7231(
	dt: Temporal.Instant | Temporal.ZonedDateTime,
): string {
	// timeZone: 'UTC', calendar: 'iso8601'
	const zdt = (isInstant(dt) ? dt : dt.toInstant()).toZonedDateTimeISO("UTC");
	const dayOfWeek = getDayOfWeekAbbreviationFromNumber(zdt.dayOfWeek);
	const year = zdt.year.toString().padStart(4, "0");
	const day = zdt.day.toString().padStart(2, "0");
	const month = getMonthAbbreviationFromNumber(zdt.month);
	const hour = zdt.hour.toString().padStart(2, "0");
	const minute = zdt.minute.toString().padStart(2, "0");
	const second = zdt.second.toString().padStart(2, "0");
	return `${dayOfWeek}, ${day} ${month} ${year} ${hour}:${minute}:${second} GMT`;
}
