<script setup lang="ts">
import RESTVue from "./components/REST.vue";
import WebSocketVue from "./components/WebSocket.vue";
import service_discovery from "../../service_discovery.json";

const o = window.origin;
</script>

<template>
  <h1>Sample Hobby App</h1>
  <RESTVue resturl="RESTURL" />
  <WebSocketVue websocketurl="WEBSOCKETURL" />
  <p>Origin: {{ o }}</p>
  <p>
    Service Discovery: <code>{{ service_discovery }}</code>
  </p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
