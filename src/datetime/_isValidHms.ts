/** @internal */
export function isValidHms(
	hour: number,
	minute: number,
	second: number,
	allowLeapSecond: boolean,
): boolean {
	return (
		hour >= 0 &&
		hour < 24 &&
		minute >= 0 &&
		minute < 60 &&
		second >= 0 &&
		second < (allowLeapSecond ? 61 : 60)
	);
}
