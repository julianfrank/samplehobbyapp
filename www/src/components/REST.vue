<template>
  <h2>resturl:{{ resturl }}</h2>
  <div>x:<input type="number" :value="x" /></div>
  <div>y:<input type="number" :value="y" /></div>
  <h3>z:{{ z }}</h3>
  <button type="button" @click="add">Add</button>
  <button type="button" @click="sub">Subtract</button>
</template>

<script setup="props" lang="ts">
import { ref } from "vue";

interface Props {
  resturl?: string;
}
const props = withDefaults(defineProps<Props>(), {
  resturl: "http://localhost:8443",
});

const x = ref(Math.round(Math.random() * 100)),
  y = ref(Math.round(Math.random() * 10)),
  z = ref(0);

function add() {
  const headersList = { Accept: "*/*" },
    req = new Request(`${props.resturl}/add?x=${x.value}&y=${y.value}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //mode: "no-cors", // no-cors, *cors, same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "omit", // include, *same-origin, omit
      headers: headersList,
      //redirect: "follow", // manual, *follow, error
      //referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  console.log(`REST.vue\tFunction add() => ${req.url}`);

  fetch(req)
    .then((res) => {
      if (!res.ok) console.error(res);
      //console.log(res);
      return res.json();
    })
    .then((res) => {
      //console.log(res);
      z.value = res.z;
    })
    .catch((err) => console.error(err));
}
function sub() {
  const headersList = { Accept: "*/*" },
    req = new Request(`${props.resturl}/sub?x=${x.value}&y=${y.value}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //mode: "no-cors", // no-cors, *cors, same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "omit", // include, *same-origin, omit
      headers: headersList,
      //redirect: "follow", // manual, *follow, error
      //referrerPolicy: "strict-origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  console.log(`REST.vue\tFunction sub() => ${req.url}`);

  fetch(req)
    .then((res) => {
      if (!res.ok) console.error(res);
      //console.log(res);
      return res.json();
    })
    .then((res) => {
      //console.log(res);
      z.value = res.z;
    })
    .catch((err) => console.error(err));
}
</script>

<style scoped>
* {
  background-color: aqua;
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
