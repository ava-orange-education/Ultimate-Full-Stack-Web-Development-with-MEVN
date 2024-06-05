const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const environment = process.env.NODE_ENV;

console.log("environment  ", process.env.NODE_ENV)

let ENVIRONMENT_VARIABLES = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.PORT': JSON.stringify('3001'),
  'process.env.MONGO_CONNECTION_STR': JSON.stringify('mongodb+srv://bhargavbook58:tester12345@todos.usujbgr.mongodb.net/todos?retryWrites=true&w=majority')
};

if(environment === 'test') {
  ENVIRONMENT_VARIABLES = {
    'process.env.NODE_ENV': JSON.stringify('test'),
    'process.env.PORT': JSON.stringify('3002'),
    'process.env.MONGO_CONNECTION_STR': JSON.stringify('mongodb+srv://bhargavbook58:tester12345@todos.usujbgr.mongodb.net/todos?retryWrites=true&w=majority')
  };
} else if(environment === 'production') {
  ENVIRONMENT_VARIABLES = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.PORT': JSON.stringify('3080'),
    'process.env.MONGO_CONNECTION_STR': JSON.stringify('mongodb+srv://bhargavbook58:tester12345@todos.usujbgr.mongodb.net/todos?retryWrites=true&w=majority')
  };
}

module.exports = {
  // Set the environment for Node.js
  target: 'node',
  // Define the entry point for the application
  entry: {
    app: ['./index.ts'] // Point to your main TypeScript file
  },
  // Define output settings
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  // Resolve .ts and .js files
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // Exclude node_modules from the bundle
  externals: [nodeExternals({
    // Do not exclude body-parser from the bundle
    allowlist: []//['body-parser', 'colors', 'cors', 'express', 'helmet', 'joi', 'mongoose', 'winston']
  })],
  // Use ts-loader to handle TypeScript files
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'none',
  plugins: [
    new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)
  ]
};