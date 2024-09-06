/**
 * same as temporal's spec, Monday: 1, Tuesday: 2, ... Sunday: 7
 */
export function getDayOfWeekFromYmd(year: number, month: number, day: number) {
	return ((new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7) + 1;
}
