const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    // ... other folders
  ],
  resolver: {
    nodeModulesPaths: ['./node_modules']
  },
  watcher: {
    watchman: true
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
