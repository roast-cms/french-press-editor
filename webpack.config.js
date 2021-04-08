module.exports = {
  entry: "./examples/index.js",
  output: {
    filename: "bundle.js",
    publicPath: "/lib/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{loader: "style-loader"}, {loader: "css-loader"}],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, //to support @font-face rule
        use: {
          loader: "url-loader",
          options: {
            limit: "10000",
            name: "[name].[ext]",
            outputPath: "fonts/",
            //the fonts will be emmited to public/assets/fonts/ folder
            //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
    fallback: {path: require.resolve("path-browserify")},
  },
  devServer: {
    disableHostCheck: true,
    port: process.env.PORT || 3002,
    historyApiFallback: {
      index: "examples/index.html",
    },
  },
  devtool: "inline-source-map",
}
