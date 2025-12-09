import { expect, test } from "vitest";

import { replaceToken, tokenize } from "./_ldmrDatePattern.js";

const replacer = (token: string) => `0x${token.charCodeAt(0).toString(16)}`.repeat(token.length);

test("replaceToken", () => {
	expect(replaceToken(`'' d 'dd'''`, replacer)).toEqual(`' 0x64 dd'`);
});

test("tokenize", () => {
	expect(tokenize(`Ж '' d+ 'dd'''`)).toEqual([
		{ type: "literal", value: `Ж ' ` },
		{ type: "field", value: "d" },
		{ type: "literal", value: `+ dd'` },
	]);
	expect(() => {
		tokenize(`'a ''`);
	}).toThrow();
});
