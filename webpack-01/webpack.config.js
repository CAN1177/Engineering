// webpack.config.js
module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: 'bundle.js',
  },
	devServer: {
    static: {
      directory: './',
    },
    port: 8080
  },
  module: {
    rules: [  
      {
        test: /.css$/,   // 正则表达式，表示.css后缀的文件
        use: ['style-loader','css-loader']   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
      }
    ]
  }
}