<template>
  <h2>websocketurl:{{ websocketurl }}</h2>
  <h3 v-if="sioConnected">socket ID:{{ sioID }}</h3>
  <h3>Clock:{{ clock }}</h3>
  <div>x:<input type="number" v-model="x" /></div>
  <div>y:<input type="number" v-model="y" /></div>
  <h3>z:{{ z }}</h3>
  <button type="button" @click="add">Add</button>
  <button type="button" @click="sub">Subtract</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";

interface Props {
  websocketurl?: string;
}
const props = withDefaults(defineProps<Props>(), {
  websocketurl: "http://localhost:8088",
});

let x = ref(Math.round(Math.random() * 100)),
  y = ref(Math.round(Math.random() * 10)),
  z = ref(0),
  clock = ref(new Date());

let socket = io(props.websocketurl, { transports: ["websocket", "polling"] }),
  sioConnected = ref(false),
  sioID = ref("");

socket.on("connect", () => {
  sioConnected.value = true;
  sioID.value = socket.id;
  console.log(`WebSocket.vue\tSocket with ID:${socket.id} Connected`);
  socket.on("disconnect", (reason) => {
    sioConnected.value = false;
    console.log(
      `WebSocket.vue\tSocket with ID:${socket.id} Disconnected with reason:${reason}`
    );
  });
  socket.on("connect_error", (err) => {
    console.log(
      `WebSocket.vue\tConnect Error, Reverting to original connect policy`,
      err
    );
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
  });
  socket.on("ADDRESULT", (res) => {
    x.value = res.x;
    y.value = res.y;
    z.value = res.z;
  });
  socket.on("SUBRESULT", (res) => {
    x.value = res.x;
    y.value = res.y;
    z.value = res.z;
  });
  socket.onAny((eventDetails, ...args) => {
    console.log(`WebSocket.vue\tEvent ${eventDetails}`, args);
  });

  socket.on("CLOCK", (clockReading) => (clock.value = clockReading));
});

function add() {
  if (socket.connected) {
    socket.emit("ADD", x.value, y.value);
  } else {
    console.log(`WebSocket.vue\tSocket not connected`);
  }
}

function sub() {
  if (socket.connected) {
    socket.emit("SUB", x.value, y.value);
  } else {
    console.log(`WebSocket.vue\tSocket not connected`);
  }
}
</script>

<style scoped>
* {
  background-color: green;
  color: white;
}
input {
  width: 3em;
}
</style>
