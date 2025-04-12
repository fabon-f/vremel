/** @internal */
export function secondsToHms(
	sec: number,
): [hour: number, minute: number, second: number] {
	const second = sec - Math.floor(sec / 60) * 60;
	const minute = Math.floor(sec / 60) % 60;
	const hour = Math.floor(sec / 3600);
	return [hour, minute, second];
}
