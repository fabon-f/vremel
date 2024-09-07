export function formatDateIso(year: number, month: number, day: number) {
	return `${year.toString()}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}
