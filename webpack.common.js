const HtmlWebPackPlugin = module.require("html-webpack-plugin");
const { CleanWebpackPlugin } = module.require("clean-webpack-plugin");
const webpack = module.require("webpack");
const path = module.require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
  output: {
    path: path.resolve(`${__dirname}/build`),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie <9",
                  ],
                  flexbox: "no-2009",
                }),
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["src/scss"],
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },

      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/[name].[hash:8].[ext]",
            },
          },
        ],
      },

      {
        test: /\.svg/,
        use: [{ loader: "url-loader" }],
        type: "javascript/auto",
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".json"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};
