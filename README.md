# vremel

[![npm](https://img.shields.io/npm/v/vremel)](https://www.npmjs.com/package/vremel) [![JSR](https://jsr.io/badges/@fabon/vremel)](https://jsr.io/@fabon/vremel)

JavaScript date utility library for [Temporal API](https://tc39.es/proposal-temporal/docs/) inspired by [date-fns](https://date-fns.org/).

- Contains only pure functions, supports tree-shaking by default.
- Supports every types of Temporal API (`Instant`, `ZonedDateTime`, `PlainDate`...) with strict TypeScript definition.
- Handles timezones and calendars strictly.
- Works fine with any polyfills and native implementations. You don't have to even load a polyfill globally.

## Install

```shell
npm install vremel
# or from JSR
deno add @fabon/vremel
```

This package is ESM-only.

## Usage

```typescript
import { compareDesc } from "vremel";
import { isEqual } from "vremel/duration"; // utility functions for Temporal.Duration

[
	Temporal.PlainDate.from("2024-01-01"),
	Temporal.PlainDate.from("2024-02-01"),
	Temporal.PlainDate.from("2023-11-30"),
]
	.sort(compareDesc)
	.map((d) => d.toString()); // [ '2024-02-01', '2024-01-01', '2023-11-30' ]

isEqual(
	Temporal.Duration.from({ hours: 3 }),
	Temporal.Duration.from({ hours: 3 }),
); // true
```

`vremel` works fine with any polyfills. Also it works even if `Temporal` doesn't exist in the global scope.

```typescript
import { Temporal } from "temporal-polyfill";
// or
import { Temporal } from "@js-temporal/polyfill";
import { isAfter } from "vremel";

isAfter(
	Temporal.PlainDate.from("2024-01-01"),
	Temporal.PlainDate.from("2024-02-01"),
); // false
```

## Polyfill Support

This package only supports latest `Temporal` polyfills following the latest spec:

- `temporal-polyfill`: `0.3.0` or above
- `@js-temporal/polyfill`: `0.5.0` or above

## Docs

- [API docs](https://jsr.io/@fabon/vremel/doc)
