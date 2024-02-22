/**
 * @fileName webpack.config.js
 * @description based.config|基础配置
 * @param mode|开发模式
 * @param entry|入口文件路径
 * @param output|打包输出配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const libraryName = 'N';
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/libs/index.js'),
  devtool: 'source-map',
  output: {
    publicPath: './',
    filename: `${libraryName}.js`,
    path: path.resolve(__dirname, '../dist'), // 打包后的目录
    library: {
      type: 'umd',
      name: libraryName, // 修改为库的名字
    },
    globalObject: 'this', // 为了使 UMD 构建在浏览器和 Node.js 上均可用，应将 output.globalObject 选项设置为 'this'
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除内容不解析
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     // {
    //     //   from: path.resolve(__dirname, '../public/assets'),
    //     //   to: path.resolve(__dirname, '../dist/assets'),
    //     // },
    //     {
    //       from: path.resolve(__dirname, '../src/index.scss'),
    //       to: path.resolve(__dirname, '../dist/'),
    //     },
    //   ],
    // }),
  ],
  devServer: {
    port: 8297,
    compress: false, //|压缩
    hot: true, //|热更新
    historyApiFallback: true, //| 解决404的问题
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    host: '0.0.0.0',
  },
};
