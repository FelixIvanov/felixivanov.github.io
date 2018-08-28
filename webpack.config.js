const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.s?css$/,
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [ 
  // new LiveReloadPlugin({
  //   port: 3000,
  //   hostname: 'localhost'}),
  new CleanWebpackPlugin('dist', {} ),
    // new ExtractTextPlugin({filename: 'style.[hash].css', disable: false, allChunks: true}),
    new MiniCssExtractPlugin({
      template: './src/style.[contenthash].css',
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};
