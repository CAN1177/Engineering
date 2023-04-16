const path = require('path');
const fs = require('fs');

module.exports = {
  // 将 entries 对象作为入口配置
	entry: './src/index.js',
	output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle.js', // 指定构建生成的文件名
  },
	module: {
		rules: [ 
			{
				test: /\.md$/,
				exclude: /node_modules/,
				loader: path.resolve('./loader/index.js'), // 使用本地的 ./loader/index.js 作为 loader
			},
		]
	},
	devServer: {
		hot: true,
  },
};