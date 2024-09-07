import { formatExactTimeIso } from "./_formatExactTimeIso.js";

export function formatIsoFromDateObject(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const millisecond = date.getMilliseconds();

	const offset = date.getTimezoneOffset();

	const offsetHours = Math.floor(Math.abs(offset) / 60)
		.toString()
		.padStart(2, "0");
	const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
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
