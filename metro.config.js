const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const defaultConfig = getDefaultConfig(projectRoot);
const { sourceExts, assetExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native-metro-config').MetroConfig}
 */
const config = {
  projectRoot: projectRoot,
  watchFolders: [projectRoot],
  resolver: {
    sourceExts: [...sourceExts, 'mjs'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
