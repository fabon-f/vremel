const regex = /''|'(?:''|[^'])+'|([a-zA-Z])\1*/g;

const unbalancedSingleQuotesErrorMessage =
	"Unbalanced single quotes. Use single quotes for escaping and two single quotes to represent actual single quote.";

function areSingleQuotesBalanced(format: string) {
	let count = 0;
	for (const char of format) {
		if (char === `'`) {
			count++;
		}
	}
	return count % 2 === 0;
}

function unescapeTwoSingleQuotes(format: string) {
	return format.replaceAll(`''`, `'`);
}

export function replaceToken(
	pattern: string,
	replacer: (token: string) => string,
): string {
	if (!areSingleQuotesBalanced(pattern)) {
		throw new Error(unbalancedSingleQuotesErrorMessage);
	}
	return pattern.replaceAll(regex, (match) => {
		if (match === `''`) {
			return `'`;
		}
		if (match.startsWith(`'`) && match.endsWith(`'`)) {
			return unescapeTwoSingleQuotes(match.slice(1, match.length - 1));
		}
		return replacer(match);
	});
}
