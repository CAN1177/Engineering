const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	// 多入口
	entry: {
		index: './src/index.js',
		other: path.resolve(__dirname, '../src/other.js'),
	}, 
	plugins: [
		// 模版配置
		new HTMLWebpackPlugin({
			title: 'webpack5系列',
			template: './src/index.html',
			filename: 'index.html',
			chunks: ['index'], // 指定引入的js文件,不需要other.js文件
		}),
		new HTMLWebpackPlugin({
			title: 'webpack5系列多模版',
			template: './src/other.html',
			filename: 'other.html',
			chunks: ['other'], // 指定引入的js文件
		}),
		new MiniCssExtractPlugin({ // 提取css文件
			filename: 'css/[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				// 从右向左解析
				use: [
					MiniCssExtractPlugin.loader, // 提取css文件
					'css-loader', // 将 CSS 转化成 CommonJS 模块
					'postcss-loader', // 自动添加浏览器前缀
				],
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
		]
	}
}