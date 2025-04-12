import { formatDateIso } from "./_formatDateIso.js";
import { formatHmsIso } from "./_formatHmsIso.js";
import { padLeadingZeros } from "./_padLeadingZeros.js";

/** @internal */
export function formatExactTimeIso(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	millisecond: number,
	offsetString: string,
): string {
	const millisecondStr = padLeadingZeros(millisecond, 3);
	return `${formatDateIso(year, month, day)}T${formatHmsIso(hour, minute, second)}.${millisecondStr}${offsetString}`;
}
