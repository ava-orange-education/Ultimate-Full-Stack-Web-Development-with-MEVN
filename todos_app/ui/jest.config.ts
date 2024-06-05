export default {
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
      '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsConfig: 'tsconfig.json'
      }]
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
    },
    testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)'],
    globals: {
      'ts-jest': {
        isolatedModules: true
      }
    }
  };
  