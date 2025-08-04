/// <reference types="vite/client" />
import "temporal-spec/global";

import { expect } from "vitest";

import { isEqual } from "./src/datetime/_equals.js";
import { isEqual as isEqualDuration } from "./src/duration/isEqual.js";
import { isDuration } from "./src/type-utils.js";
import type { TemporalType } from "./src/types.js";

async function loadPolyfill(packageName: unknown) {
	if (packageName === undefined) {
		return;
	}
	if (
		packageName !== "temporal-polyfill" &&
		packageName !== "@js-temporal/polyfill"
	) {
		throw new Error("Unknown polyfill");
	}
	const { Temporal, toTemporalInstant } =
		packageName === "temporal-polyfill" ?
			await import("temporal-polyfill")
		:	await import("@js-temporal/polyfill");
	globalThis.Temporal = Temporal;
	Date.prototype.toTemporalInstant = toTemporalInstant;
}

await loadPolyfill(import.meta.env["POLYFILL"]);

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
