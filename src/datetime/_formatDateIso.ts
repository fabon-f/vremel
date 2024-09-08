import { padLeadingZeros } from "./_padLeadingZeros.js";

export function formatDateIso(year: number, month: number, day: number) {
	return `${year.toString()}-${padLeadingZeros(month, 2)}-${padLeadingZeros(day, 2)}`;
}
