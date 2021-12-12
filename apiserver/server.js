const express = require("express"),
  service_discovery = require("./assets/service_discovery.json");
const app = express(),
  PORT = 8443 || process.env.PORT;

app.get("/", function (req, res) {
  res.json(service_discovery);
});

app.listen(PORT, () => console.log(`API Server running on ${PORT}`));
