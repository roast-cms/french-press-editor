module.exports = {
  entry: "./examples/index.js",
  output: {
    filename: "bundle.js",
    publicPath: "/lib/"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        query: {
          presets: ["react"],
          plugins: ["transform-object-rest-spread"]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3002,
    historyApiFallback: {
      index: 'examples/index.html',
    },
  },
  devtool: "inline-source-map"
}
