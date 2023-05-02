<script setup>
import HelloWorld from './components/HelloWorld.vue'

const objJs = import.meta.globEager('./assets/js/*.js')
// objJs['./assets/js/a.js'].default()

const  res = objJs['./assets/js/a.js'].default['obj'].age
console.log("%c Line:9 🍡 res", "color:#ea7e5c", res);
// 简化上述方法
const keys = Object.keys(objJs)

// Q: 为什么要这样写？
// A: 因为import.meta.globEager('./assets/js/*.js')返回的是一个对象，对象的key是文件的路径，value是文件的内容
//    我们需要的是文件的内容，所以需要遍历对象，将value取出来
for (const path of keys) {
  let n = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.js'))
  // console.log("%c Line:18 🥐", "color:#b03734", objJs[path].default);
  objJs[n] = objJs[path].default
  delete objJs[path]
}
// 最终调用简化为
objJs.a.fn()


import jsUrl  from './assets/js/a.js?url'
console.log("%c Line:26 🥤 jsUrl", "color:#b03734", jsUrl);

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite3 + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
