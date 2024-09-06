/**
 * same as temporal's spec, Monday: 1, Tuesday: 2, ... Sunday: 7
 */
export function getDayOfWeekAbbreviationFromNumber(num: number): string {
	const name = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][num - 1];
	if (name === undefined) {
		throw new Error(`Invalid week of day number: ${num}`);
	}
	return name;
}
