/**
 * @internal
 * same as temporal's spec, Monday: 1, Tuesday: 2, ... Sunday: 7
 */
export function getDayOfWeekNumberFromAbbreviation(dayOfWeek: string): number {
	const index = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(
		dayOfWeek,
	);
	if (index === -1) {
		throw new Error(`Unknown day of week: ${dayOfWeek}`);
	}
	return index + 1;
}
