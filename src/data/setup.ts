import { decode, encode } from 'base-64'
import * as RxDB from 'rxdb'
import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

import { groupSchema } from './groups'
import { taskSchema } from './tasks'

// @ts-ignore
if (!global.btoa) {
  // @ts-ignore
  global.btoa = encode
}

// @ts-ignore
if (!global.atob) {
  // @ts-ignore
  global.atob = decode
}

// @ts-ignore
process.browser = true

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)

RxDB.plugin(SQLiteAdapter)
RxDB.plugin(require('pouchdb-adapter-http'))

let db: null | RxDB.RxDatabase = null

export const database = new Promise<RxDB.RxDatabase>(resolve => {
  if (db) {
    resolve(db as RxDB.RxDatabase)
  }
  RxDB.create({
    name: 'myplannerdb',
    adapter: 'react-native-sqlite',
    multiInstance: true,
  }).then(data =>
    Promise.all([
      data.collection({
        name: 'tasks',
        schema: taskSchema,
      }),
      data.collection({
        name: 'groups',
        schema: groupSchema,
      }),
    ]).then(() => {
      db = data
      resolve(db)
    })
  )
})
