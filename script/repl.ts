import repl from "node:repl";
import { inspect } from "node:util";

import { consola } from "consola";
// @ts-ignore (type error when `dist` doesn't exist)
import * as vremel from "vremel";
// @ts-ignore (type error when `dist` doesn't exist)
import * as vremelDuration from "vremel/duration";

const choice = await consola.prompt("Select polyfill", {
	type: "select",
	options: ["temporal-polyfill", "@js-temporal/polyfill"],
});

if (typeof choice === "symbol") {
	// Symbol(clack:cancel)
	process.exit(0);
}

const { Temporal } = await import(choice);
const server = repl.start("> ");
server.context["Temporal"] = Temporal;
server.context["vremel"] = vremel;
server.context["vremelDuration"] = vremelDuration;

for (const type of [
	Temporal.Instant,
	Temporal.ZonedDateTime,
	Temporal.PlainDateTime,
	Temporal.PlainDate,
	Temporal.PlainTime,
	Temporal.PlainYearMonth,
	Temporal.PlainMonthDay,
	Temporal.Duration,
]) {
	type.prototype[inspect.custom] = function () {
		return `${this[Symbol.toStringTag]}: ${this.toString()}`;
	};
}
