// @ts-nocheck
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEslint from "typescript-eslint";

const __dirname = import.meta.dirname;

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	{
		plugins: {
			"@typescript-eslint": tsEslint.plugin,
			"simple-import-sort": simpleImportSort,
		},
	},
	{
		ignores: [
			"dist",
			"_site",
			"eslint.config.js",
			".prettierrc.js",
			"src/temporal.d.ts",
		],
	},
	{
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: ["./tsconfig.json"],
				tsconfigRootDir: __dirname,
			},
		},
	},
	eslint.configs.recommended,
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	eslintConfigPrettier,
	{
		rules: {
			camelcase: "error",
			"default-param-last": "error",
			eqeqeq: "error",
			"no-console": "error",
			"no-eval": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowNever: true,
				},
			],
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
	{
		files: ["src/**/*.test.ts", "script/**/*.{ts,js}"],
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
				{ argsIgnorePattern: "^_" },
			],
		},
	},
];
