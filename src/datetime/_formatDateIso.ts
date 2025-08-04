import { padLeadingZeros } from "./_padLeadingZeros.js";

/** @internal */
export function formatDateIso(
	year: number,
	month: number,
	day: number,
): string {
	return `${padLeadingZeros(year, 4)}-${padLeadingZeros(month, 2)}-${padLeadingZeros(day, 2)}`;
}
