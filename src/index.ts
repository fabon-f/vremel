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
export type { Interval } from "./types.js";
