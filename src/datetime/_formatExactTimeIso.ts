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
	const yearStr = year.toString();
	const monthStr = month.toString().padStart(2, "0");
	const dayStr = day.toString().padStart(2, "0");
	const hourStr = hour.toString().padStart(2, "0");
	const minuteStr = minute.toString().padStart(2, "0");
	const secondStr = second.toString().padStart(2, "0");
	const millisecondStr = millisecond.toString().padStart(3, "0");
	return `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}${offsetString}`;
}
