import hello from './hello.js'
import './css/index.css'
import './css/a.css'
import './css/font.css'
import { createApp } from 'vue'

import main from './vue/main.vue'

createApp(main).mount('#app')
console.log("%c Line:2 🥑 hello", "color:#7f2b82", hello, '9999');


// const fn = () => {
// 	console.log('fn', '9999')
// }
// fn()

