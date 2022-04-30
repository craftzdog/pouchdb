# [PouchDB](https://pouchdb.com/) for React Native

[![Build Status](https://github.com/pouchdb/pouchdb/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/pouchdb/pouchdb/actions/workflows/ci.yml?query=branch%3Amaster) [![Coverage Status](https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.svg)](https://coveralls.io/github/pouchdb/pouchdb?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/pouchdb/pouchdb.svg)](https://greenkeeper.io/) [![npm version](https://img.shields.io/npm/v/pouchdb.svg)](https://www.npmjs.com/package/pouchdb) [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/pouchdb/badge?style=rounded)](https://www.jsdelivr.com/package/npm/pouchdb)

A PouchDB fork for React Native with binary attachments support.

## Using PouchDB

Check out [a small example](./example).

### Install

1. Install dev package:

   ```
   yarn add -D babel-plugin-module-resolver
   ```

2. Install polyfill packages:

   ```sh
   yarn add events process base-64 react-native-get-random-values react-native-quick-md5
   ```

3. Install pouchdb packages:

   ```sh
   yarn add @craftzdog/pouchdb-core-react-native @craftzdog/pouchdb-binary-utils-react-native pouchdb-adapter-http pouchdb-mapreduce pouchdb-replication react-native-pouchdb-md5
   ```

   Note: `@craftzdog/pouchdb-replication-react-native` is no longer needed.

4. Install storage adapter packages:

   ```sh
   yarn add pouchdb-adapter-react-native-sqlite react-native-sqlite-2
   ```

5. Install CocoaPods:

   ```sh
   cd ios && pod install
   ```

### Configure

1. Make a `shim.js`:

   ```js
   import "react-native-get-random-values";
   import { decode, encode } from "base-64";

   if (typeof process === "undefined") {
     global.process = require("process");
   } else {
     const bProcess = require("process");
     for (var p in bProcess) {
       if (!(p in process)) {
         process[p] = bProcess[p];
       }
     }
   }

   if (!global.btoa) {
     global.btoa = encode;
   }

   if (!global.atob) {
     global.atob = decode;
   }

   process.browser = true;
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
             'pouchdb-md5': 'react-native-pouchdb-md5',
             'pouchdb-binary-utils':
               '@craftzdog/pouchdb-binary-utils-react-native',
           },
         },
       ],
     ],
   };
   ```

## See also

- [craftzdog/react-native-pouchdb-md5: PouchDB utilities for calculating MD5 checksums for React Native](https://github.com/craftzdog/react-native-pouchdb-md5)
- [craftzdog/pouchdb-adapter-react-native-sqlite: PouchDB adapter using ReactNative SQLite as its backing store](https://github.com/craftzdog/pouchdb-adapter-react-native-sqlite#readme)

## Contributing

We're always looking for new contributors! If you'd like to try your hand at writing code, writing documentation, designing the website, writing a blog post, or answering [questions on StackOverflow](http://stackoverflow.com/search?tab=newest&q=pouchdb), then we'd love to have your input.

If you have a pull request that you'd like to submit, please read the [contributing guide](https://github.com/pouchdb/pouchdb/blob/master/CONTRIBUTING.md) for info on style, commit message format, and other (slightly!) nitpicky things like that. PouchDB is heavily tested, so you'll also want to check out the [testing guide](https://github.com/pouchdb/pouchdb/blob/master/TESTING.md).
