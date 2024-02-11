module.exports = {
	root: true,
	plugins: ["simple-import-sort"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json"],
		tsconfigRootDir: __dirname,
	},
	ignorePatterns: [
		"dist",
		".eslintrc.cjs",
		".prettierrc.js",
		"src/temporal.d.ts",
	],
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
	overrides: [
		{
			files: ["src/**/*.test.ts", "script/**/*.ts"],
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
	],
};
