import repl from 'node:repl'
import { consola } from 'consola'
import * as vremel from '../src/index.js'

const choice = await consola.prompt('Select polyfill', {
  type: 'select',
  options: ['@js-temporal/polyfill', 'temporal-polyfill'],
})

const { Temporal } = await import(choice)
const server = repl.start('> ')
server.context['Temporal'] = Temporal
server.context['vremel'] = vremel
