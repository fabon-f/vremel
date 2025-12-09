import { utcTimeStamp } from "./_utcTimeStamp.js";

/** @internal */
export function isValidYmd(year: number, month: number, day: number): boolean {
	const date = new Date(utcTimeStamp(year, month, day));
	return (
		date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
	);
}
