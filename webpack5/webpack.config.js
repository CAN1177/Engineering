const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
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
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
			},
		],
	},
	devServer: {
		hot: true,
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
			filename:'./css/index.css'
		}),
		new OptimizeCssAssetsWebpackPlugin()
	],
}