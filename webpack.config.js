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
          presets: ["react", "es2015"],
          plugins: ["transform-class-properties"]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: { extensions: ["*", ".js"] },
  devServer: {
    port: 3002,
    historyApiFallback: {
      index: "examples/index.html"
    }
  },
  devtool: "inline-source-map"
}
