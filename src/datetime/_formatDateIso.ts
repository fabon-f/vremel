import { padLeadingZeros } from "./_padLeadingZeros.js";

/** @internal */
export function formatDateIso(
	year: number,
	month: number,
	day: number,
): string {
	return `${year.toString()}-${padLeadingZeros(month, 2)}-${padLeadingZeros(day, 2)}`;
}
