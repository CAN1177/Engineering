const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  entry: {
    main: "./src/index.js", // 指定构建入口文件
  },
  
  output: {
    path: path.join(__dirname, "dist/[hash]/"), // 使用 hash
    filename: "[name].js", // 使用 entry 名称
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        include: [
          path.resolve(__dirname, "src"), // 指定哪些路径下的文件需要经过 loader 处理
        ],
        use: {
          loader: "babel-loader", // 指定使用的 loader
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css/,
        include: [path.resolve(__dirname, "src")],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(png | jpg | gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false, // 这里设置为false
              // 如果图片大小小于这个值，就会被打包为base64格式
              limit: 10 * 10000,
              name: "[hash1000].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin([{ from: "src/public", to: "public" }]),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // 开发服务器启动路径
  },
};
