
const marked = require('marked');

// module.exports = obj => {
// 	console.log("%c Line:5 🍋 obj", "color:#4fff4B", obj);
// 	console.log("%c Line:5 🍧 obj", "color:#3f7cff", marked.parse(obj));

	

// 	return `module.exports = 'abc md'`
// };

module.exports = function (obj) {
	console.log("%c Line:5 🍋 obj", "color:#4fff4B", marked.parse(obj));
	console.log("%c Line:5 🍧 obj", "color:#3f7cff", marked.parse(obj, this.getOptions()));
	console.log("%c Line:18 🍔 this.getOptions()", "color:#3f7cff", this.getOptions());
	let html = marked.parse(obj, this.getOptions());

	// 单个loader
	// return `module.exports = '${JSON.stringify(html)}'`

	// 多个loader, 把结果作为参数传入下一个loader
	return html
}