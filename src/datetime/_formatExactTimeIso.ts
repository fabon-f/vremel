import { formatDateIso } from "./_formatDateIso.js";

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
	const hourStr = hour.toString().padStart(2, "0");
	const minuteStr = minute.toString().padStart(2, "0");
	const secondStr = second.toString().padStart(2, "0");
	const millisecondStr = millisecond.toString().padStart(3, "0");
	return `${formatDateIso(year, month, day)}T${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}${offsetString}`;
}
