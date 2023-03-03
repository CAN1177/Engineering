const path = require('path')

module.exports = {
	mode: "production",
	// entry: "./src/index.js",
	entry: {
		main: "./src/index.js"
	},
	output: {
		// __dirname当前模块的目录名
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js', // 指定构建生成的文件名
	},
	devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  },
}