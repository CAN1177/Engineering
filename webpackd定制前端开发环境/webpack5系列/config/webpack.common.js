const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { MyPlugin } = require("../plugin/MyPlugin");

module.exports = {
  // 多入口
  entry: {
    index: "./src/index.js",
    other: path.resolve(__dirname, "../src/other.js"),
  },
  plugins: [
    // 模版配置
    new HTMLWebpackPlugin({
      title: "webpack5系列",
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"], // 指定引入的js文件,不需要other.js文件
    }),
    new HTMLWebpackPlugin({
      title: "webpack5系列多模版",
      template: "./src/other.html",
      filename: "other.html",
      chunks: ["other"], // 指定引入的js文件
    }),
    new MiniCssExtractPlugin({
      // 提取css文件
      filename: "css/[name].css",
    }),
    new VueLoaderPlugin(),
    new MyPlugin({
      info: '12132434'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        // 从右向左解析
        use: [
          MiniCssExtractPlugin.loader, // 提取css文件
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "postcss-loader", // 自动添加浏览器前缀
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules文件夹
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // Q: 为什么要配置useBuiltIns: "usage"? 它的其他值是什么意思?
                  // A: useBuiltIns: "usage" 会根据你的代码来判断是否需要引入polyfill，而不是全部引入。
                  //    useBuiltIns: "entry" 会在入口文件中引入所有的polyfill，这样会导致打包文件过大。
                  //    useBuiltIns: false 不会引入polyfill，需要手动引入。
                  useBuiltIns: "usage", // 按需加载
                  corejs: { version: 3 }, // 指定core-js版本
                  targets: {
                    // 指定兼容性处理哪些浏览器
                    chrome: "60",
                    firefox: "50",
                    ie: "9",
                    safari: "10",
                    edge: "17",
                  },
                },
              ],
            ],
            cacheDirectory: true, // 开启babel缓存
          },
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
        generator: {
          filename: "font/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        // Q: type的值有哪学，具体什么意思?
        // A: type的值有asset/resource、asset/inline、asset/source、asset、javascript/auto、javascript/esm、javascript/dynamic、javascript/module、json/auto、json/dynamic、json/module、webassembly/experimental。
        //    具体的含义可以参考：https://webpack.docschina.org/guides/asset-modules/
        type: "asset",
        // parser: {
        // 	// Q: 为什么要配置dataUrlCondition?
        // 	// A: 为了限制图片大小，只有小于100kb的图片才会被转换为base64格式。
        //   dataUrlCondition: {
        //     maxSize: 100 * 1024, // 100kb
        //   },
        // },
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.text$/,
        use: [
          {
            loader: path.resolve(__dirname, "../loader/loaderText.js"),
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: path.resolve(__dirname, "../loader/addDivLoader.js"),
          },
          {
            loader: path.resolve(__dirname, "../loader/mdLoader.js"),
            options: {
              headerIds: false, // 不生成标题id
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Q: 为什么要配置resolve?
    // A: 为了简化引入模块的路径，比如引入vue文件，可以直接写 import Vue from 'vue'，而不用写 import Vue from '../../node_modules/vue/dist/vue.esm.js'。
    extensions: [".js", ".vue", ".json"],
  },
};
