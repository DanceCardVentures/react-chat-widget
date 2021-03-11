const webpack = module.require("webpack");
const merge = module.require("webpack-merge");
const TerserPlugin = module.require("terser-webpack-plugin");
const CompressionPlugin = module.require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = module.require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
  ],
});
