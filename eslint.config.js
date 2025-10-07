import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEslint from "typescript-eslint";

const __dirname = import.meta.dirname;

export default defineConfig([
	{
		plugins: {
			"@typescript-eslint": tsEslint.plugin,
			"simple-import-sort": simpleImportSort,
		},
	},
	globalIgnores([
		"dist",
		"_site",
		"eslint.config.js",
		".prettierrc.js",
		"src/temporal.d.ts",
	]),
	{
		languageOptions: {
			parser: tsEslint.parser,
			ecmaVersion: "latest",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},
	},
	eslint.configs.recommended,
	tsEslint.configs.strictTypeChecked,
	tsEslint.configs.stylisticTypeChecked,
	{
		rules: {
			camelcase: "error",
			eqeqeq: "error",
			"no-console": "error",
			"no-eval": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/default-param-last": "error",
			"@typescript-eslint/method-signature-style": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-loop-func": "error",
			"@typescript-eslint/no-require-imports": "error",
			"@typescript-eslint/no-unsafe-unary-minus": "error",
			"@typescript-eslint/require-array-sort-compare": "error",
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowNever: true,
				},
			],
			"@typescript-eslint/strict-boolean-expressions": "error",
			"@typescript-eslint/switch-exhaustiveness-check": "error",
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
	{
		files: [
			"src/**/*.test.ts",
			"src/_test/**/*.{ts,js}",
			"script/**/*.{ts,js}",
		],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			"no-console": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", ignoreUsingDeclarations: true },
			],
		},
	},
]);
