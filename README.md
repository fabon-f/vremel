# vremel

JavaScript date utility library for [Temporal API](https://tc39.es/proposal-temporal/docs/) inspired by [date-fns](https://date-fns.org/).

- Contains only pure functions, supports tree-shaking by default.
- Supports every types of Temporal API (Instant, ZonedDateTime, PlainDate...) with strict TypeScript definition.
- Handles timezone and calendar strictly.
- Works fine with any polyfills. You don't have to even load a polyfill globally.

## Install

```shell
npm install vremel
```

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

## Docs

- [API docs](https://jsr.io/@fabon/vremel/doc)
