import { padLeadingZeros } from "./_padLeadingZeros.js";

export function formatHmsIso(hour: number, minute: number, second: number) {
	return `${padLeadingZeros(hour, 2)}:${padLeadingZeros(minute, 2)}:${padLeadingZeros(second, 2)}`;
}
