import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import PouchDB from './pouchdb';

function openDB() {
  return new PouchDB('mydb.db', { adapter: 'react-native-sqlite' });
}

function openRemoteDB() {
  return new PouchDB('<COUCHDB_URL>');
}

async function resetDB() {
  const db = openDB();
  return db.destroy();
}

async function replicateFromRemote(local, remote) {
  return new Promise((resolve, reject) => {
    local.replicate
      .from(remote, {})
      .on('complete', async () => {
        console.log('done!');
        resolve();
      })
      .on('error', function (err) {
        console.error('failed to replicate:', err.message, err.stack);
        reject(err);
      });
  });
}

async function replicateToRemote(local, remote) {
  return new Promise((resolve, reject) => {
    local.replicate
      .to(remote, {})
      .on('complete', async () => {
        console.log('done!');
        resolve();
      })
      .on('error', function (err) {
        console.error('failed to replicate:', err.message, err.stack);
        reject(err);
      });
  });
}

async function runPouchDB() {
  // await resetDB();
  const db = openDB();
  console.log('db info:', await db.info());
  const remotedb = openRemoteDB();
  console.log('remote db info:', await remotedb.info());

  db.changes({
    since: 'now',
    live: true,
  }).on('change', (change) => {
    console.log('change:', change);
  });

  // replicateFromRemote(db, remotedb)
  await replicateToRemote(db, remotedb);
}

export default function App() {
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    console.log('global.base64FromArrayBuffer:', global.base64FromArrayBuffer);
    if (global.base64FromArrayBuffer) {
      setResult('Running..');
      runPouchDB().then(() => setResult('Done!'));
    } else {
      console.warn('global.base64FromArrayBuffer is not defined');
      setResult('global.base64FromArrayBuffer is not defined. Reload the app.');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
