/// <reference types="vite/client" />
import "temporal-spec/global";

// TODO: remove this after playwright starts using Firefox 141 or later
// @ts-expect-error patching polyfill
Symbol.dispose ??= Symbol.for("Symbol.dispose");

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
