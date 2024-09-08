import { formatDateIso } from "./_formatDateIso.js";
import { padLeadingZeros } from "./_padLeadingZeros.js";

export function formatExactTimeIso(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	millisecond: number,
	offsetString: string,
) {
	const hourStr = padLeadingZeros(hour, 2);
	const minuteStr = padLeadingZeros(minute, 2);
	const secondStr = padLeadingZeros(second, 2);
	const millisecondStr = padLeadingZeros(millisecond, 3);
	return `${formatDateIso(year, month, day)}T${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}${offsetString}`;
}
