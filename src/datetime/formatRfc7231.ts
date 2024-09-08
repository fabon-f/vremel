import { isInstant } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { getDayOfWeekAbbreviationFromNumber } from "./_getDayOfWeekAbbreviationFromNumber.js";
import { getMonthAbbreviationFromNumber } from "./_getMonthAbbreviationFromNumber.js";
import { padLeadingZeros } from "./_padLeadingZeros.js";

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
	const year = padLeadingZeros(zdt.year, 4);
	const day = padLeadingZeros(zdt.day, 2);
	const month = getMonthAbbreviationFromNumber(zdt.month);
	const hour = padLeadingZeros(zdt.hour, 2);
	const minute = padLeadingZeros(zdt.minute, 2);
	const second = padLeadingZeros(zdt.second, 2);
	return `${dayOfWeek}, ${day} ${month} ${year} ${hour}:${minute}:${second} GMT`;
}
