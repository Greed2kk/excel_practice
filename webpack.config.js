const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const filename = ext =>
  isDev ? `bundle.[hash].${ext}` : `bundle.[hash].${ext}`

const plugins = [
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: true,
    dry: false,
  }),
  new HTMLWebpackPlugin({
    template: 'index.html',
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd,
    },
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: isDev ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
  }),
]

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: isProd ? 'production' : 'development',
  entry: ['@babel/polyfill', './index.js'],
  target: 'web',
  cache: true,
  output: {
    filename: isDev ? '[name].js' : filename('js'),
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8000,
    hot: true,
    open: true,
    //writeToDisk: true,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
