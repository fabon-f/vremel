import { compare } from "./datetime/_compare.js";
import { getTypeName } from "./type-utils.js";
import type { Interval, TemporalType } from "./types.js";

export function assertSameType(a: TemporalType, b: TemporalType) {
	if (getTypeName(a) !== getTypeName(b)) {
		throw new Error(
			`Temporal type mismatch: ${getTypeName(a)} and ${getTypeName(b)}`,
		);
	}
}

export function assertValidInterval(i: Interval) {
	assertSameType(i.start, i.end);
	if (compare(i.start, i.end) === 1) {
		throw new Error("Invalid interval");
	}
}
