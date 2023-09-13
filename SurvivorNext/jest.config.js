module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  };