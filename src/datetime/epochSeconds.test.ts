import { expect, test } from "vitest";

import { epochSeconds } from "./epochSeconds.js";

test("epochSeconds with Instant", () => {
	expect(epochSeconds(Temporal.Instant.from("1970-01-01T00:00:01Z"))).toEqual(
		1,
	);
	expect(epochSeconds(Temporal.Instant.from("1969-12-31T23:59:59Z"))).toEqual(
		-1,
	);
});

test("epochSeconds with ZonedDateTime", () => {
	expect(
		epochSeconds(
			Temporal.Instant.from("1970-01-01T00:00:01Z").toZonedDateTimeISO(
				"Europe/London",
			),
		),
	).toEqual(1);
	expect(
		epochSeconds(
			Temporal.Instant.from("1969-12-31T23:59:59Z").toZonedDateTimeISO(
				"Europe/London",
			),
		),
	).toEqual(-1);
});

test("epochSeconds with fractional second", () => {
	expect(epochSeconds(Temporal.Instant.from("1970-01-01T00:00:01.3Z"))).toEqual(
		1,
	);
	expect(epochSeconds(Temporal.Instant.from("1969-12-31T23:59:59.3Z"))).toEqual(
		-1,
	);
});
