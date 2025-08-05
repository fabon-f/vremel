import { expect, test } from "vitest";

import { isValidHms } from "./_isValidHms.js";

test("isValidHms", () => {
	expect(isValidHms(0, 0, 0, false)).toEqual(true);
	expect(isValidHms(23, 59, 59, false)).toEqual(true);
	expect(isValidHms(23, 59, 60, false)).toEqual(false);
	expect(isValidHms(23, 60, 0, false)).toEqual(false);
	expect(isValidHms(24, 0, 0, false)).toEqual(false);
});

test("allowing leap second", () => {
	expect(isValidHms(23, 59, 60, true)).toEqual(true);
	expect(isValidHms(23, 58, 60, true)).toEqual(false);
});
