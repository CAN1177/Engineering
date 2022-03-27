const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 

module.exports = {
  mode: 'development', // 指定构建模式

  entry: './src/index.js', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },
  plugins: [
    new BundleAnalyzerPlugin(), // 分析打包大小使用默认配置
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 配置文件模板
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' // 这里也可以使用 [hash]
    }), // 将 css 文件单独抽离的 plugin
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.jsx?/, // 支持 js 和 jsx 文件，使用 react 时需要
        include: [
          path.resolve(__dirname, 'src'), // 指定哪些路径下的文件需要经过 loader 处理
        ],
        use: {
          loader: 'babel-loader', // 指定使用的 loader
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }, 
}