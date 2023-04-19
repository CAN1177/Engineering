import hello from './hello.js'
import './css/index.css'
import './css/a.css'
import './css/font.css'
import { createApp } from 'vue'

import main from './vue/main.vue'

import text from './text/a.text'

console.log("%c Line:10 🥚 text", "color:#6ec1c2", text);

import md from '../m.md'
console.log("%c Line:14 🍆 md", "color:#93c0a4", md);

// let element = document.createElement('div')
// element.innerHTML = text
// document.body.appendChild(element)


createApp(main).mount('#app')
console.log("%c Line:2 🥑 hello", "color:#7f2b82", hello, '9999');


// const fn = () => {
// 	console.log('fn', '9999')
// }
// fn()

