// 处理路径
const fs = require('fs');
const path = require('path');


// fs.realpathSync() // 返回一个绝对路径的规范化版本，解析符号链接。如果 path 不存在，则返回一个空字符串。
const srcPath = fs.realpathSync(process.cwd()); // 返回当前工作目录的绝对路径(用来配置环境变量)

// path.resolve() // 将路径或路径片段的序列解析为绝对路径。
const resolveSrc = n => path.resolve(srcPath, n);

module.exports = { resolveSrc };