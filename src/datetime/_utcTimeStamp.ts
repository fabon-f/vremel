export function utcTimeStamp(
	year: number,
	month = 1,
	day = 1,
	hour = 0,
	minute = 0,
	second = 0,
	millisecond = 0,
) {
	const date = new Date();
	date.setUTCFullYear(year, month - 1, day);
	date.setUTCHours(hour, minute, second, millisecond);
	return date.getTime();
}
