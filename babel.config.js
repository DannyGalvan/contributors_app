module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'react-native-sqlite-storage': 'react-native-quick-sqlite',
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
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
