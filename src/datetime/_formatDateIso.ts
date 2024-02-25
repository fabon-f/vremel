export function formatDateIso(date: Date) {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const second = date.getSeconds().toString().padStart(2, "0");
	const millisecond = date.getMilliseconds().toString().padStart(3, "0");

	const offset = date.getTimezoneOffset();

	const offsetHours = Math.floor(Math.abs(offset) / 60)
		.toString()
		.padStart(2, "0");
	const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
	const offsetString = `${offset > 0 ? "-" : "+"}${offsetHours}:${offsetMinutes}`;

	return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}${offsetString}`;
}
