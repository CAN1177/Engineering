class MyPlugin {
  constructor(options) {
    console.log("%c Line:3 🍏 options", "color:#e41a6a", options);
    this.options = options;
  }
  // compiler是啥？
  // compiler是webpack的实例，包含了webpack的所有配置信息
  apply(compiler) {
    // emit是webpack内置的钩子函数 emit是什么作用？
    // 输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。
    // emit是webpack打包过程中的一个阶段，emit阶段会生成打包后的资源文件
    // compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
    // 	// 可以通过 compilation 对象绑定各种钩子
    // 	// console.log("%c Line:9 🎂 compilation", "color:#2eafb0", compilation.assets);
    // 	// compilation.hooks.optimize.tap('MyPlugin', () => {
    //   //   console.log('资源已经优化完毕。');
    //   // });
    // 	console.log("MyPlugin 我的插件demo");
    // 	callback();
    // });

    // // 同步方式
    // compiler.hooks.emit.tap("MyPlugin", (compilation, callback) => {
    //   let assets = compilation.assets;
    //   // console.log("%c Line:21 🌰 assets", "color:#2eafb0", assets);
    //   Object.entries(assets).forEach(([filename, source]) => {
    //     console.log("%c Line:23 🍎 filename", "color:#4fff4B", filename);
    //     console.log("%c Line:23 🍎 source", "color:#4fff4B", source.size());
    //   });
		// });
		
		

  }
}

module.exports = { MyPlugin };
