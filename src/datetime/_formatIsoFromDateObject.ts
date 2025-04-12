import { formatExactTimeIso } from "./_formatExactTimeIso.js";
import { padLeadingZeros } from "./_padLeadingZeros.js";

/** @internal */
export function formatIsoFromDateObject(date: Date): string {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const millisecond = date.getMilliseconds();

	const offset = date.getTimezoneOffset();

	const offsetHours = padLeadingZeros(Math.floor(Math.abs(offset) / 60), 2);
	const offsetMinutes = padLeadingZeros(Math.abs(offset) % 60, 2);
	const offsetString = `${offset > 0 ? "-" : "+"}${offsetHours}:${offsetMinutes}`;

	return formatExactTimeIso(
		year,
		month,
		day,
		hour,
		minute,
		second,
		millisecond,
		offsetString,
	);
}
