# vremel

JavaScript date utility library for [Temporal API](https://tc39.es/proposal-temporal/docs/) inspired by [date-fns](https://date-fns.org/).

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
