/** @internal */
export function escapeRegExp(str: string): string {
	return str.replaceAll(
		/^[0-9a-fA-F]|[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g,
		(char) => `\\x${char.charCodeAt(0).toString(16)}`,
	);
}
