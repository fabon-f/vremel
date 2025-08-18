import { padLeadingZeros } from "./_padLeadingZeros.js";
import { secondsToHms } from "./_secondsToHms.js";

/**
 * @internal
 * The result includes sub-minute offset
 */
export function formatOffsetIso(
	offsetSeconds: number,
	includeColon: boolean,
): string {
	const sign = offsetSeconds < 0 ? "-" : "+";
	const [h, m, s] = secondsToHms(Math.abs(offsetSeconds)).map((v) =>
		padLeadingZeros(v, 2),
	) as [string, string, string];
	return includeColon ? `${sign}${h}:${m}:${s}` : `${sign}${h}${m}${s}`;
}
