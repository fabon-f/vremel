/** @internal */
export function getMonthNumberFromAbbreviation(monthName: string): number {
	const index = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	].indexOf(monthName);
	if (index === -1) {
		throw new Error(`Unknown month name: ${monthName}`);
	}
	return index + 1;
}
