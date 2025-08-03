import { expect, test } from "vitest";

import { epochMicroseconds } from "./epochMicroseconds.js";

test("Instant", () => {
	expect(
		epochMicroseconds(Temporal.Instant.from("1970-01-01T00:00:00.000001Z")),
	).toEqual(1n);
	expect(
		epochMicroseconds(Temporal.Instant.from("1969-12-31T23:59:59.999999Z")),
	).toEqual(-1n);
});

test("ZonedDateTime", () => {
	expect(
		epochMicroseconds(
			Temporal.Instant.from("1970-01-01T00:00:00.000001Z").toZonedDateTimeISO(
				"Europe/London",
			),
		),
	).toEqual(1n);
	expect(
		epochMicroseconds(
			Temporal.Instant.from("1969-12-31T23:59:59.999999Z").toZonedDateTimeISO(
				"Europe/London",
			),
		),
	).toEqual(-1n);
});

test("Instant with nanoseconds", () => {
	expect(
		epochMicroseconds(Temporal.Instant.from("1970-01-01T00:00:00.000001234Z")),
	).toEqual(1n);
	expect(
		epochMicroseconds(Temporal.Instant.from("1969-12-31T23:59:59.999999876Z")),
	).toEqual(-1n);
});
