export function modifyTimeZone(timeZoneId: string) {
	const originalTimeZone = process.env.TZ;
	process.env.TZ = timeZoneId;
	return {
		restore() {
			if (originalTimeZone !== undefined) {
				process.env.TZ = originalTimeZone;
			} else {
				delete process.env.TZ;
			}
		},
		[Symbol.dispose]() {
			this.restore();
		},
	};
}
