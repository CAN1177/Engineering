const { merge } = require("webpack-merge");
const { resolveSrc } = require('./path.js');
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: 'js/[name].[contenthash].build.js',	// 打包后的文件名称
		path: resolveSrc('dist'), // 打包后的目录，必须是绝对路径
		clean: true, // 清理 /dist 文件夹
	},
});
