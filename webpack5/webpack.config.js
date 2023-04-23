const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 清理dist目录
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        // Question: 为什么要加上m?
        // Answer: 因为有些第三方包的js文件是用es6写的，所以要加上m
        test: /\.m?js$/,
        exclude: /node_modules/, // 排除node_modules目录
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // Question: 为什么要加上useBuiltIns: "usage"?
                  // Answer: 因为要按需加载polyfill
                  useBuiltIns: 'usage',
                  corejs: { version: 3 },
                  targets: 'defaults',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    liveReload: true, // 自动刷新
    compress: true, // 开启gzip压缩
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.xdclass.net',
        pathRewrite: { '^/api': '' }, // 重写路径
        secure: false, // 如果是https接口，需要配置这个参数
      },
      changeOrigin: true, // 支持跨域  覆盖源主机名
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: '首页',
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'mine.html',
      title: '我的',
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 移除空格
      },
    }),
    new MiniCssExtractPlugin({
      filename: './css/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new ESLintPlugin({
      exclude: 'dist', // 排除dist目录
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
  ],
};
