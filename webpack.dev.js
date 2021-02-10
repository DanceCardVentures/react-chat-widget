const HtmlWebPackPlugin = module.require("html-webpack-plugin");
const webpack = module.require("webpack");
const merge = module.require("webpack-merge");
const common = module.require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
  ],
  devServer: {
    contentBase: "./public",
    publicPath: "/",
    port: 5000,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: "silent",
  },
});
