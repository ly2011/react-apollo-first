const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const customMedia = require('postcss-custom-media')
const customProperties = require('postcss-custom-properties')
const pxtorem = require('postcss-pxtorem')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    // 无论 path 是什么, dev 环境的 `index.html` 所引用的 js 路径都是 文件名而已(即与 path 完全无关. 只与
    // filename 字段有关而已)
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    // filename: 'build.js',
    filename: '[name]__[hash:16].bundle.js',
    chunkFilename: '[name]__[hash:16].bundle.js'
  },
  resolve: {
  //   // modules: [path.resolve(__dirname, '../src'), 'node_modules', path.resolve(__dirname, '../node_modules')],
  //   // enforceExtension: false,
  //   // moduleExtensions: ['-loader'],
  //   // enforceModuleExtension: false,
  //   // modulesDirectories: ['node_modules', path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src')], // import时到哪些地方去寻找模块(webpack2去掉这个配置了)
  //   extensions: [
  //     // '.js',
  //     // '.web.js',
  //     // '.json',
  //     // '.vue',
  //     // '.jsx',
  //     // '.scss',
  //     // '.less',
  //     // '.css',
  //     // '.jpg',
  //     // '.png',
  //     // '.gif',
  //     // '.svg'
  //   ],
  //   // fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'SRC': path.resolve(__dirname, '../src'),
      'ASSETS': path.resolve(__dirname, '../src/assets'),
      'COMPONENTS': path.resolve(__dirname, '../src/components'),
      'ACTIONS': path.resolve(__dirname, '../src/actions'),
      'CONSTANTS': path.resolve(__dirname, '../src/constants'),
      'CONTAINERS': path.resolve(__dirname, '../src/containers'),
      'MIDDLEWARE': path.resolve(__dirname, '../src/middleware'),
      'REDUCERS': path.resolve(__dirname, '../src/reducers'),
      'STORE': path.resolve(__dirname, '../src/store'),
      'ROUTES': path.resolve(__dirname, '../src/routes')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src'),
        // loader: 'css-loader'
        // loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader'
        loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader'
        )
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../node_modules'),
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, '../src'),
        // loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader',
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'
        )
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, '../node_modules'),
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../src'),
        // loader: ['css-loader', 'postcss-loader', 'less-loader']
        // loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!less-loader'
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!less-loader'
        )
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../node_modules'),
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        // 只有去掉babel的cjs模块，才能做tree shaking打包(https://github.com/xyc-cn/webpack2-demo/blob/master/webpack.config.js)
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(ttf|woff|eot)$/,
        loader: 'file-loader',
        query: {
          name: 'file/[name].[ext]'
        }
      }, {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        query: {
          name: 'file/[name].[ext]'
        }
      }
    ]
  },
  postcss: function () {
    return [
      customMedia(),
      cssnext(),
      customProperties(),
      // pxtorem({rootValue: 20, propWhiteList: []})
    ]
  },
  vue: {
    loaders: {
      postcss: [require('autoprefixer')({flexbox: true, browsers: ['last 3 versions']})],
      css: ExtractTextPlugin.extract(
        'vue-style-loader',
        'css-loader!postcss-loader'
      ),
      scss: ExtractTextPlugin.extract(
        'vue-style-loader',
        'css-loader!postcss-loader!sass-loader'
      ),
      sass: ExtractTextPlugin.extract(
        'vue-style-loader',
        'css-loader!postcss-loader!sass-loader'
      ),
      js: 'babel-loader',
      html: 'vue-html-loader',
      extract: true
    }
  },
  plugins: [

  ]
}
