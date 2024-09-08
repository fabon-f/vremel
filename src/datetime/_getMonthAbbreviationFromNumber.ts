export function getMonthAbbreviationFromNumber(num: number): string {
	const name = [
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
	][num - 1];
	if (name === undefined) {
		throw new Error(`Invalid month number: ${num}`);
	}
	return name;
}
