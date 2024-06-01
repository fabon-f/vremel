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
