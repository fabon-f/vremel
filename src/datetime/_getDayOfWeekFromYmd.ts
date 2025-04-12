import { formatDateIso } from "./_formatDateIso.js";

/**
 * @internal
 * same as temporal's spec, Monday: 1, Tuesday: 2, ... Sunday: 7
 */
export function getDayOfWeekFromYmd(
	year: number,
	month: number,
	day: number,
): number {
	const date = new Date(Date.UTC(year, month - 1, day));
	if (
		date.getUTCFullYear() !== year ||
		date.getUTCMonth() !== month - 1 ||
		date.getUTCDate() !== day
	) {
		throw new Error(`Invalid date: ${formatDateIso(year, month, day)}`);
	}
	return ((date.getUTCDay() + 6) % 7) + 1;
}
