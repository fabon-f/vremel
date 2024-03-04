import { Temporal as Temporal2 } from "@js-temporal/polyfill";
import { Temporal as Temporal1 } from "temporal-polyfill";
import { expect } from "vitest";

import { isEqual } from "./src/datetime/_equals.js";
import { isEqual as isEqualDuration } from "./src/duration/isEqual.js";
import { isDuration } from "./src/type-utils.js";
import type { TemporalType } from "./src/types.js";

function isTemporal(a: unknown): a is TemporalType {
	return [
		Temporal1.Instant,
		Temporal1.ZonedDateTime,
		Temporal1.PlainDate,
		Temporal1.PlainTime,
		Temporal1.PlainDateTime,
		Temporal1.PlainYearMonth,
		Temporal1.PlainMonthDay,
		Temporal1.Duration,
		Temporal2.Instant,
		Temporal2.ZonedDateTime,
		Temporal2.PlainDate,
		Temporal2.PlainTime,
		Temporal2.PlainDateTime,
		Temporal2.PlainYearMonth,
		Temporal2.PlainMonthDay,
		Temporal2.Duration,
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
