import moment from 'moment'
import * as RxDB from 'rxdb'
import { HOUR_FORMAT } from '~planner/utils'

RxDB.plugin(require('pouchdb-adapter-asyncstorage'))

let db: null | RxDB.RxDatabase = null

export const database = new Promise<RxDB.RxDatabase>(resolve => {
  if (db) {
    resolve(db as RxDB.RxDatabase)
  }

  // RxDB.removeDatabase('myplannerdb', 'asyncstorage')

  RxDB.create({
    name: 'myplannerdb',
    adapter: 'asyncstorage',
    multiInstance: false,
  }).then(data =>
    Promise.all([
      data.collection({
        name: 'tasks',
        schema: require('./tasks/schema.json'),
        migrationStrategies: {
          1: (oldDoc: { startTime: string; endTime: string }) => {
            oldDoc.startTime = moment().format(HOUR_FORMAT)
            oldDoc.endTime = moment().format(HOUR_FORMAT)

            return oldDoc
          },
        },
      }),
      data.collection({
        name: 'groups',
        schema: require('./groups/schema.json'),
      }),
      data.collection({
        name: 'notes',
        schema: require('./notes/schema.json'),
      }),
    ]).then(() => {
      db = data
      resolve(db)
    })
  )
})
