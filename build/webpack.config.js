const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

/**
 * 目录/路径
 */
const srcPath = path.join(__dirname, '../src')
// const buildPath = path.resolve(__dirname, '../dist')
const faviconPath = path.resolve(__dirname, srcPath, 'assets/favicon.ico')

const developmentConf = merge(baseConfig, {
  // entry: {
  //   // index: path.join(__dirname, '../src/index.js'),
  //   // index: [path.resolve(__dirname, '../src/index.js')],
  //   // vendor: [
  //   //   'react',
  //   //   'react-dom',
  //   //   'react-router',
  //   //   'react-redux',
  //   //   'react-router-redux',
  //   //   'redux-thunk',
  //   //   'isomorphic-fetch',
  //   //   // 'classnames',
  //   //   // 'babel-polyfill'
  //   // ]
  // },
  // entry: '../src/index.js',
  entry: [
    'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', path.resolve(__dirname, '../src/index.js')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      favicon: faviconPath, // favicon路径
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      // more options: https://github.com/kangax/html-minifier#options-quick-reference
      },
      cache: false,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CommonsChunkPlugin({
      name: ['mainifest'], // 将公共模块提取, 参照 entry
      minChunks: Infinity // 提取所有entry共同依赖的模块
    }),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '../'),
    //   manifest: require(path.resolve(__dirname,'../manifest.json')),
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../src'), // 本地服务器所加载的页面所在的目录
    // colors: true, // 终端中输出结果为彩色
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true,
    port: 8080,
    compress: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: true,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
})

module.exports = developmentConf
