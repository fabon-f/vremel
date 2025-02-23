import { escapeRegExp } from "./_escapeRegExp.js";

export function unionRegExp(strings: string[]): string {
	return strings
		.map((str) => escapeRegExp(str))
		.filter((str) => str !== "")
		.join("|");
}
