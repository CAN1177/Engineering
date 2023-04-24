const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line import/no-extraneous-dependencies
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// eslint-disable-next-line import/no-unresolved
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    mine: './src/mine.js',
  },
  output: {
    filename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // 清理dist目录
  },
  resolve: {
    alias: {
      // 指定路径的别名
      '@': path.resolve('src'),
    },
    // 自动解析模块的后缀名
    extensions: ['.js', '.json', '.less'],
  },
  externals: { // 排除第三方包
    jquery: 'jQuery',
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // 标记未使用的代码
    usedExports: true,
    // 删除已经标记未使用的代码
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  // plugins: [
  //   new BundleAnalyzerPlugin(),
  // ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
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
            cacheDirectory: true, // 开启缓存
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
};
