import { expect, test } from "vitest";

import { padLeadingZeros } from "./_padLeadingZeros.js";

test("padLeadingZeros", () => {
	expect(padLeadingZeros(3, 2)).toEqual("03");
	expect(padLeadingZeros(23, 2)).toEqual("23");
});
