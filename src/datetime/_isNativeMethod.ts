/**
 * @internal
 * This method is not reliable when a polyfill overwrites `Function.prototype.toString` (as core-js do),
 * but neither `temporal-polyfill` or `@js-temporal/polyfill` does that.
 */
export function isNativeMethod<T>(obj: T, name: keyof T): boolean {
	return new RegExp(
		[
			"^function",
			name,
			"\\(",
			"[^)]*",
			"\\)",
			"\\{",
			"\\[",
			"native",
			"code",
			"\\]",
			"\\}",
			"$",
		].join("\\s*"),
	).test(Function.prototype.toString.call(obj[name]));
}
