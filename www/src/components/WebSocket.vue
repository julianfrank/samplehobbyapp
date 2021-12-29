<script setup lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";

interface Props {
  websocketurl?: string;
}
const props = withDefaults(defineProps<Props>(), {
  websocketurl: "http://localhost:8088",
});

const x = ref(Math.round(Math.random() * 100)),
  y = ref(Math.round(Math.random() * 10)),
  z = ref(0),
  clock = ref(new Date());

let socket = io(props.websocketurl);

socket.on("connect", () => {
  console.log(socket.id); // "G5p5..."
});
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
* {
  background-color: cadetblue;
}

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
