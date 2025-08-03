import { formatDateTimeIso } from "./_formatDateTimeIso.js";

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
	return `${formatDateTimeIso(year, month, day, hour, minute, second, millisecond)}${offsetString}`;
}
