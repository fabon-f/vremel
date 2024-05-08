/**
 * @module
 *
 * This module contains functions for `Temporal.Duration`.
 *
 * ```typescript
 * import { isEqual } from "vremel/duration";
 * isEqual(
 *   Temporal.Duration.from({ hours: 3 }),
 *   Temporal.Duration.from({ hours: 3 }),
 * ); // true
 * ```
 */

export { isEqual } from "./isEqual.js";
export { longest } from "./longest.js";
export { shortest } from "./shortest.js";
