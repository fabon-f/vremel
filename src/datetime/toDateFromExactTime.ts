import type { GenericDateConstructor, Temporal } from "../types.js";

/**
 * Returns `Date` which represents exact time of the given temporal object.
 *
 * @param dateTime Temporal object which includes exact time info
 * @param DateConstructor `Date` or extended class for return type, default is `Date`
 * @returns `Date` (or its subclass) object which represents the exact time of the given Temporal object
 */
export function toDateFromExactTime<DateType extends Date = Date>(
	dateTime: Temporal.ZonedDateTime | Temporal.Instant,
	DateConstructor?: GenericDateConstructor<DateType>,
): DateType {
	const DateConstructorFunction = DateConstructor ?? Date;
	return new DateConstructorFunction(dateTime.epochMilliseconds) as DateType;
}
