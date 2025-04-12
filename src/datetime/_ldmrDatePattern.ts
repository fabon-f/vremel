type Token =
	| {
			type: "literal";
			value: string;
	  }
	| {
			type: "field";
			value: string;
	  };

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

/** @internal */
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

function pushLiteral(tokens: Token[], literal: string) {
	const previousToken = tokens[tokens.length - 1];
	if (previousToken !== undefined && previousToken.type === "literal") {
		previousToken.value += literal;
	} else {
		tokens.push({
			type: "literal",
			value: literal,
		});
	}
}

/** @internal */
export function tokenize(pattern: string): Token[] {
	if (!areSingleQuotesBalanced(pattern)) {
		throw new Error(unbalancedSingleQuotesErrorMessage);
	}
	let lastIndex = 0;
	const tokens: Token[] = [];
	for (const match of pattern.matchAll(regex)) {
		if (match.index > lastIndex) {
			pushLiteral(tokens, pattern.slice(lastIndex, match.index));
		}
		const fragment = match[0];
		if (fragment === `''`) {
			pushLiteral(tokens, `'`);
		} else if (fragment.startsWith(`'`) && fragment.endsWith(`'`)) {
			pushLiteral(
				tokens,
				unescapeTwoSingleQuotes(fragment.slice(1, fragment.length - 1)),
			);
		} else {
			tokens.push({
				type: "field",
				value: fragment,
			});
		}
		lastIndex = match.index + fragment.length;
	}
	if (lastIndex < pattern.length) {
		// rest
		pushLiteral(tokens, pattern.slice(lastIndex));
	}
	return tokens;
}
