<script setup lang="ts">
import { ref } from "vue";

defineProps<{ websocketurl: string }>();

const x = ref(Math.round(Math.random() * 100)),
  y = ref(Math.round(Math.random() * 10)),
  z = ref(0),
  clock = ref(new Date());
</script>

<template>
  <h2>websocketurl:{{ websocketurl }}</h2>
  <h3>Clock:{{ clock }}</h3>
  <div>x:<input type="number" :value="x" /></div>
  <div>y:<input type="number" :value="y" /></div>
  <h3>z:{{ z }}</h3>
  <button type="button" @click="z = x + y">Add</button>
  <button type="button" @click="z = x - y">Subtract</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

input {
  width: 3em;
}
</style>
