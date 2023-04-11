const path = require('path');
const fs = require('fs');

// src/pages 目录为页面入口的根目录
const pagesRoot = path.resolve(__dirname, './src/pages');
// fs 读取 pages 下的所有文件夹来作为入口，使用 entries 对象记录下来
const entries = fs.readdirSync(pagesRoot).reduce((entries, page) => {
  // 文件夹名称作为入口名称，值为对应的路径，可以省略 `index.js`，webpack 默认会寻找目录下的 index.js 文件
  entries[page] = path.resolve(pagesRoot, page);
  return entries;
}, {});


module.exports = {
  // 将 entries 对象作为入口配置
  entry: entries,

  // ...
	resolve: {
		// 自动解析确定的扩展，能够使用户在引入模块时不带扩展(配置别名)
		alias: {
			utils: path.resolve(__dirname, 'src/utils/'), // 为了方便引用，设置别名(使用 path.resolve 和 __dirname 来获取绝对路径)
		},
		// 自动解析确定的扩展，能够使用户在引入模块时不带扩展(扩展名称配置, 例如 import 'utils'，会自动解析成 import 'utils.js')
		extensions: ['.js', '.json', '.jsx', '.css'],
		modules: ['node_modules'], // 指定第三方模块的查找目录,也可以自定义目录
		mainFiles: ['index'], // 指定模块的默认文件名
		resolveLoader: {
			extensions: ['.js', '.json', '.jsx', '.css'], 
			mainFields: ['loader', 'main'], // 指定 loader 的默认文件名
		}
	},
	module: {
		rules: [ 
			
		]
	}
};