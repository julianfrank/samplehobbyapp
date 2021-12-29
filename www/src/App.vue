<script setup lang="ts">
import { ref, reactive } from "vue";
import RESTVue from "./components/REST.vue";
import WebSocketVue from "./components/WebSocket.vue";
import service_discovery from "../../service_discovery.json";

const o = window.origin,
  app_env = o == "https://localhost:8080" ? "dev" : "prod";

const RESTURL = service_discovery[app_env].api,
  WEBSOCKETURL = service_discovery[app_env].pubsub;
</script>

<template>
  <h1>Sample Hobby App</h1>
  <RESTVue :resturl="RESTURL" />
  <WebSocketVue :websocketurl="WEBSOCKETURL" />

  <p>Origin: {{ o }}</p>
  <p>app_env: {{ app_env }}</p>
  <pre>
    Service Discovery:
   <samp>{{ JSON.stringify(service_discovery, null, `\t`) }}</samp> 
  </pre>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: lightgoldenrodyellow;
}

pre {
  text-align: left;
}
</style>
