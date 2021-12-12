const express = require("express"),
  axios = require("axios"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8443 || process.env.PORT;

app.all("/", function (req, res) {
  res.json(service_discovery);
});
app.all("/add", function (req, res) {
  const { port, hostname, pathname, protocol } = new URL(
    service_discovery.dev.add
  );
  //console.log(req.query);
  const { x, y } = req.query;
  console.log(
    `Trying to ADD x=${x} + y=${y} using ${hostname}:${port}${pathname}`
  );

  axios
    .post(`${service_discovery.dev.add}/add?x=${x}&y=${y}`)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error({ error: error.toJSON() });
      res.json({ error: error.toJSON() });
    });
});
app.all("/sub", function (req, res) {
  res.json("sub");
});

app.listen(PORT, () => console.log(`API Server running on ${PORT}`));
