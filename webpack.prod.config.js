const config = require("./webpack.config.js");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

config.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  })
);

config.optimization.minimizer.push(
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    uglifyOptions: {
      compress: false,
      ecma: 6,
      mangle: true
    },
    sourceMap: true
  })
);

config.plugins.push(
  new CopyWebpackPlugin([{ from: "examples", to: "examples" }])
);

module.exports = config;
