/** @internal */
export function padLeadingZeros(
	num: number | string,
	maxLength: number,
): string {
	return num.toString().padStart(maxLength, "0");
}
