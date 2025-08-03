import { isInstant } from "../type-utils.js";
import type { Temporal } from "../types.js";
import { formatHmsIso } from "./_formatHmsIso.js";
import { getDayOfWeekAbbreviationFromNumber } from "./_getDayOfWeekAbbreviationFromNumber.js";
import { getMonthAbbreviationFromNumber } from "./_getMonthAbbreviationFromNumber.js";
import { padLeadingZeros } from "./_padLeadingZeros.js";

/**
 * Returns a string in RFC 7231's format which represents an exact time of given temporal object.
 * Units smaller than second are ignored (rounded down).
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
	if (zdt.year < 0 || zdt.year > 9999) {
		throw new Error(`RFC 7231 format can't represent year ${zdt.year}`);
	}
	const year = padLeadingZeros(zdt.year, 4);
	const day = padLeadingZeros(zdt.day, 2);
	const month = getMonthAbbreviationFromNumber(zdt.month);
	return `${dayOfWeek}, ${day} ${month} ${year} ${formatHmsIso(zdt.hour, zdt.minute, zdt.second)} GMT`;
}
