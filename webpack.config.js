const Dotenv = require('dotenv-webpack');
 
module.exports = {
  entry: './src/index.ts',
  plugins: [
    new Dotenv()
  ],
  module: {
  rules: [
    {
      test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
    }]}
};