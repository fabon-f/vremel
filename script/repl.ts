import repl from "node:repl";

import { consola } from "consola";

import * as vremelDuration from "../src/duration/index.js";
import * as vremel from "../src/index.js";

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
server.context["vremel"].duration = vremelDuration;

const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");

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
	type.prototype[customInspectSymbol] = function () {
		return `${this[Symbol.toStringTag]}: ${this.toString()}`;
	};
}
