/** @internal */
export function isValidHms(
	hour: number,
	minute: number,
	second: number,
	allowLeapSecond: boolean,
): boolean {
	return (
		(allowLeapSecond && hour === 23 && minute === 59 && second === 60) ||
		(hour >= 0 &&
			hour < 24 &&
			minute >= 0 &&
			minute < 60 &&
			second >= 0 &&
			second < 60)
	);
}
