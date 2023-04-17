const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

const { resolveSrc } = require('./path.js');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: '[name].build.js',	// 打包后的文件名称
		path: resolveSrc('dist'), // 打包后的目录，必须是绝对路径
		clean: true, // 清理 /dist 文件夹
	},

	devtool: 'eval-cheap-module-source-map', // 开发环境推荐使用 eval-cheap-module-source-map，生产环境推荐使用 source-map
	// 自动更新
	devServer: {
		static: './dist', // 指定静态资源目录
		port: 8080, // 端口
		hot: true, // 开启热更新
	},
});
