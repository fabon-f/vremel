export class TimeZoneModifier {
	originalTimeZone: string | undefined;
	constructor() {
		this.originalTimeZone = process.env.TZ;
	}
	set(zoneId: string) {
		process.env.TZ = zoneId;
	}
	restore() {
		if (this.originalTimeZone !== undefined) {
			process.env.TZ = this.originalTimeZone;
		} else {
			delete process.env.TZ;
		}
	}
}
