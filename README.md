# [PouchDB](https://pouchdb.com/) for React Native

A performant fork of PouchDB for React Native.

**NOTE**: The attachment support has been dropped since I no longer store binary data in PouchDB.

## How to use PouchDB on React Native with SQLite

### Install

1. Install dev package:

   ```
   yarn add -D babel-plugin-module-resolver
   ```

2. Install polyfill packages:

   ```sh
   yarn add events react-native-get-random-values react-native-quick-base64
   ```

3. Install pouchdb packages:

   ```sh
   yarn add pouchdb-core pouchdb-replication pouchdb-mapreduce pouchdb-adapter-http
   ```

4. Install patched package:

   ```sh
   yarn add @craftzdog/pouchdb-collate-react-native
   ```

   It avoids using ['\u0000' chars](https://github.com/facebook/react-native/issues/12731) for indexing (See [this commit](https://github.com/craftzdog/pouchdb-react-native/commit/228f68220fe31236f6630b71c030eef29ae6e7a8)).
   

4. Install storage adapter packages:

   ```sh
   yarn add pouchdb-adapter-react-native-sqlite react-native-quick-sqlite react-native-quick-websql
   ```

   - [react-native-quick-sqlite](https://github.com/ospfranco/react-native-quick-sqlite) - A fast bindings via JSI for SQLite
   - [react-native-quick-websql](https://github.com/craftzdog/react-native-quick-websql/) - WebSQL wrapper for quick-sqlite
   - [pouchdb-adapter-react-native-sqlite](https://github.com/craftzdog/pouchdb-adapter-react-native-sqlite) - PouchDB adapter for SQLite with those two modules

5. Install CocoaPods:

   ```sh
   npx pod-install
   ```

### Configure

1. Make a `shim.js`:

   ```js
   import {shim} from 'react-native-quick-base64'

   shim()

   // Avoid using node dependent modules
   process.browser = true
   ```

   then, require it at the beginning of your `index.js`.

2. Edit your `babel.config.js` like so:

   ```
   module.exports = {
     presets: ['module:metro-react-native-babel-preset'],
     plugins: [
       [
         'module-resolver',
         {
           alias: {
             'pouchdb-collate': '@craftzdog/pouchdb-collate-react-native',
           },
         },
       ],
     ],
   }
   ```

### Initialize

Create `pouchdb.ts` like so:

```ts
import 'react-native-get-random-values'
import PouchDB from 'pouchdb-core'
import HttpPouch from 'pouchdb-adapter-http'
import replication from 'pouchdb-replication'
import mapreduce from 'pouchdb-mapreduce'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'
import WebSQLite from 'react-native-quick-websql'

const SQLiteAdapter = SQLiteAdapterFactory(WebSQLite)

export default PouchDB.plugin(HttpPouch)
  .plugin(replication)
  .plugin(mapreduce)
  .plugin(SQLiteAdapter)
```

Then, import and use it as usual:

```ts
import PouchDB from './pouchdb'

const db = new PouchDB('mydb.db', {
  adapter: 'react-native-sqlite'
})
```

## Contributing

We're always looking for new contributors! If you'd like to try your hand at writing code, writing documentation, designing the website, writing a blog post, or answering [questions on StackOverflow](http://stackoverflow.com/search?tab=newest&q=pouchdb), then we'd love to have your input.

If you have a pull request that you'd like to submit, please read the [contributing guide](https://github.com/pouchdb/pouchdb/blob/master/CONTRIBUTING.md) for info on style, commit message format, and other (slightly!) nitpicky things like that. PouchDB is heavily tested, so you'll also want to check out the [testing guide](https://github.com/pouchdb/pouchdb/blob/master/TESTING.md).
