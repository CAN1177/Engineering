<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'



defineProps({
  msg: String,
})

axios.get('/api/index/ding.json').then(res => {
  console.log(res.data)
})

const count = ref(0)

let countVal = 0
// 监听count的值变化
watch(count, (newVal, oldVal) => {
  console.log("%c Line:21 🍋 newVal", "color:#4fff4B", newVal);
  console.log("%c Line:22 🍋 oldVal", "color:#4fff4B", oldVal);
  countVal = newVal
})

console.log("%c Line:28 🍋 countVal", "color:#4fff4B", countVal);

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>postCss 嵌套</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
