const webpack = module.require("webpack");
const merge = module.require("webpack-merge");
const TerserPlugin = module.require("terser-webpack-plugin");
const CompressionPlugin = module.require("compression-webpack-plugin");
const common = module.require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|ts|tsx)$|\.css$|\.scss$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
  ],
});
