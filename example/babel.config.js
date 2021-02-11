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
