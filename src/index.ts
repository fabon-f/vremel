/**
 * @module
 * This module contains functions for datetime objects from Temporal API,
 * for example `Temporal.ZonedDateTime` and `Temporal.PlainDate`.
 *
 * ```typescript
 * import { latest } from "vremel";
 * ```
 */

export * from "./datetime/index.js";
/**
 * @example
 * ```typescript
 * import { isEqual } from "vremel/duration";
 * ```
 */
export * as duration from "./duration/index.js";
export type { Interval } from "./types.js";
