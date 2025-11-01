import { expect, test } from "vitest";

import { isNativeMethod } from "./_isNativeMethod.js";

class Dummy {
	static classMethod() {}
	instanceMethod() {}
}

test("isNativeMethod on native methods", () => {
	expect(isNativeMethod(new Date(), "getTime")).toEqual(true);
	expect(isNativeMethod(Date.prototype, "getTime")).toEqual(true);
	expect(isNativeMethod(Date, "parse")).toEqual(true);
});

test("isNativeMethod on userland methods", () => {
	expect(isNativeMethod(new Dummy(), "instanceMethod")).toEqual(false);
	expect(isNativeMethod(Dummy.prototype, "instanceMethod")).toEqual(false);
	expect(isNativeMethod(Dummy, "classMethod")).toEqual(false);
});
