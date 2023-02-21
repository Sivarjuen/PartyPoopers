const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.ts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public/assets", to: "assets" }],
    }),
    new webpack.DefinePlugin({
      "process.env.npm_package_version": JSON.stringify(process.env.npm_package_version || "dev"),
    }),
  ],
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [path.resolve(__dirname, "../node_modules"), path.resolve(__dirname, "../server")],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
