const express = require("express"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8001 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ add: service_discovery });
});

app.listen(PORT, () => console.log(`ADD Server running on ${PORT}`));
