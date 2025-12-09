import { utcTimeStamp } from "./_utcTimeStamp.js";

/**
 * @internal
 * same as temporal's spec, Monday: 1, Tuesday: 2, ... Sunday: 7
 */
export function getDayOfWeekFromYmd(year: number, month: number, day: number): number {
	const date = new Date(utcTimeStamp(year, month, day));
	return ((date.getUTCDay() + 6) % 7) + 1;
}
