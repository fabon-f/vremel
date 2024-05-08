/**
 * @module
 * This module contains functions for datetime objects from Temporal API,
 * for example `Temporal.ZonedDateTime` and `Temporal.PlainDate`.
 *
 * ```typescript
 * import { latest } from "vremel";
 * latest([
 *   Temporal.PlainDate.from("2024-01-01"),
 *   Temporal.PlainDate.from("2024-02-01"),
 *   Temporal.PlainDate.from("2023-11-30"),
 * ]).toString(); // "2024-02-01"
 * ```
 */

export * from "./datetime/index.js";
// export `Temporal` until Temporal API becomes stage 4 and appears on the MDN reference
export type {
	ArrayOf,
	GenericDateConstructor,
	Interval,
	Temporal,
} from "./types.js";
