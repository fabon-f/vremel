import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { formatRfc7231 } from "./formatRfc7231.js";

test("ZonedDateTime", () => {
	expect(
		formatRfc7231(
			Temporal.ZonedDateTime.from("2024-06-07T10:23:45+09:00[Asia/Tokyo]"),
		),
	).toEqual("Fri, 07 Jun 2024 01:23:45 GMT");
	expect(
		formatRfc7231(
			Temporal.ZonedDateTime.from(
				"2024-06-07T10:23:45+09:00[Asia/Tokyo][u-ca=hebrew]",
			),
		),
	).toEqual("Fri, 07 Jun 2024 01:23:45 GMT");
});

test("Instant", () => {
	expect(formatRfc7231(Temporal.Instant.from("2024-06-07T01:23:45Z"))).toEqual(
		"Fri, 07 Jun 2024 01:23:45 GMT",
	);
});

test("fractional seconds", () => {
	// units smaller than second is ignored
	expect(
		formatRfc7231(Temporal.Instant.from("2024-06-07T01:23:45.123456789Z")),
	).toEqual("Fri, 07 Jun 2024 01:23:45 GMT");
	expect(
		formatRfc7231(Temporal.Instant.from("1968-06-07T01:23:45.123456789Z")),
	).toEqual("Fri, 07 Jun 1968 01:23:45 GMT");
});
