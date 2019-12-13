import { decode, encode } from 'base-64';
import * as RxDB from 'rxdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

// @ts-ignore
if (!global.btoa) {
  // @ts-ignore
  global.btoa = encode;
}

// @ts-ignore
if (!global.atob) {
  // @ts-ignore
  global.atob = decode;
}

// @ts-ignore
process.browser = true;

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

RxDB.plugin(SQLiteAdapter);
// RxDB.plugin(require('pouchdb-adapter-react-native-sqlite'));
RxDB.plugin(require('pouchdb-adapter-http'));

let database;
const createDb = async () => {
  database = await RxDB.create({
    name: 'mydatabase',
    adapter: 'react-native-sqlite', // the name of your adapter
  });

  console.log(database);
};

createDb();

// function errorCB(err: any) {
//   console.log('SQL Error: ' + err);
// }

// function successCB() {
//   console.log('SQL executed fine');
// }

// function openCB() {
//   console.log('Database OPENED');
// }

// var db = SQLite.openDatabase('test.db', '1.0', 'Test Database', 200000, openCB, errorCB);

// console.log(db);
