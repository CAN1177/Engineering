<template>
  <div>
    <h1>vue环境</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "main",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style scoped>
p {
  color: pink;
	font-size: 28px;
}
</style>
