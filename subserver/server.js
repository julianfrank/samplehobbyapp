const express = require("express"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8002 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ sub: service_discovery });
});

app.listen(PORT, () => console.log(`SUBTRACT Server running on ${PORT}`));
