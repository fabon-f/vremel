/// <reference types="vite/client" />
import "temporal-spec/global";

async function loadPolyfill(packageName: unknown) {
	if (packageName === undefined) {
		return;
	}
	if (
		packageName !== "temporal-polyfill" &&
		packageName !== "@js-temporal/polyfill" &&
		packageName !== "temporal-polyfill-lite"
	) {
		throw new Error("Unknown polyfill");
	}
	const { Temporal, toTemporalInstant } =
		packageName === "temporal-polyfill-lite"
			? await import("temporal-polyfill-lite/calendars-full")
			: packageName === "@js-temporal/polyfill"
				? await import("@js-temporal/polyfill")
				: await import("temporal-polyfill");
	// @ts-expect-error type mismatch between latest and outdated Temporal type definition
	globalThis.Temporal = Temporal;
	// @ts-expect-error type mismatch (ditto)
	Date.prototype.toTemporalInstant = toTemporalInstant;
}

await loadPolyfill(import.meta.env["POLYFILL"]);
