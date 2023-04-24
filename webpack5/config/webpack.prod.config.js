// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');

// eslint-disable-next-line import/no-extraneous-dependencies
const HTMLWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
// const ESLintPlugin = require('eslint-webpack-plugin');
// eslint-disable-next-line import/no-unresolved, import/extensions
const baseWebpackConfig = require('./webpack.base.config.js');

const prodWebpackConfig = merge(baseWebpackConfig, {
  // 开发环境的配置
  mode: 'production',
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
    // new ESLintPlugin({
    //   exclude: 'dist', // 排除dist目录
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    //   fix: true,
    // }),
  ],
});

module.exports = prodWebpackConfig;
