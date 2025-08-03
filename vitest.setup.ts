import "temporal-spec/global";

import { expect } from "vitest";

import { isEqual } from "./src/datetime/_equals.js";
import { isEqual as isEqualDuration } from "./src/duration/isEqual.js";
import { isDuration } from "./src/type-utils.js";
import type { TemporalType } from "./src/types.js";

if (
	process.env["POLYFILL"] === "temporal-polyfill" ||
	process.env["POLYFILL"] === "@js-temporal/polyfill"
) {
	/* eslint-disable @typescript-eslint/no-unsafe-assignment */
	const { Intl, Temporal, toTemporalInstant } = await import(
		process.env["POLYFILL"]
	);
	Object.assign(globalThis, { Intl, Temporal });
	Date.prototype.toTemporalInstant = toTemporalInstant;
	/* eslint-enable @typescript-eslint/no-unsafe-assignment */
}

function isTemporal(a: unknown): a is TemporalType {
	return [
		Temporal.Instant,
		Temporal.ZonedDateTime,
		Temporal.PlainDate,
		Temporal.PlainTime,
		Temporal.PlainDateTime,
		Temporal.PlainYearMonth,
		Temporal.PlainMonthDay,
		Temporal.Duration,
	].some((C) => a instanceof C);
}

function areTemporalsEqual(a: unknown, b: unknown) {
	const isATemporal = isTemporal(a);
	const isBTemporal = isTemporal(b);
	if (isATemporal && isBTemporal) {
		if (a.constructor.name !== b.constructor.name) {
			return false;
		}
		if (isDuration(a) && isDuration(b)) {
			return isEqualDuration(a, b);
		}
		if (isDuration(a) || isDuration(b)) {
			return false;
		}
		return isEqual(a, b);
	} else if (!isATemporal && !isBTemporal) {
		return undefined;
	} else {
		return false;
	}
}

expect.addEqualityTesters([areTemporalsEqual]);
