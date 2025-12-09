import type { GenericDateConstructor } from "../types.js";

/** @internal */
export function createDateFromClockTime<DateType extends Date>(
	DateConstructor: GenericDateConstructor<DateType>,
	year: number,
	month: number,
	day = 1,
	hour = 0,
	minute = 0,
	second = 0,
	millisecond = 0,
): DateType {
	if (year >= 0 && year <= 99) {
		// assumption: there is no time zone transition in ancient times
		// therefore it's safe to run `setFullYear` and `setHours` separately
		const date = new DateConstructor(500, 0, 1);
		date.setFullYear(year, month - 1, day);
		date.setHours(hour, minute, second, millisecond);
		return date;
	}
	return new DateConstructor(year, month - 1, day, hour, minute, second, millisecond);
}
