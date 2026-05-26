module.exports = function (api) {
  api.cache(false);
  const envApp = process.env.ENV_APP || 'debug';
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: `.env.${envApp}`,
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            'react-native-sqlite-storage': 'react-native-nitro-sqlite',
            '@icons': './src/assets/icons',
            '@images': './src/assets/images',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@services': './src/services',
            '@config': './src/config',
            '@stores': './src/stores',
            '@hooks': './src/hooks',
            '@navigations': './src/navigators',
            '@styles': './src/styles',
            '@app-types': './src/types',
            '@assets': './src/assets',
            '@database': './src/database',
            '@validations': './src/validations',
            '@observables': './src/observables',
            '@theme': './src/theme',
          },
        },
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      'react-native-worklets/plugin',
    ],
  };
};
