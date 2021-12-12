const express = require("express"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8003 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ clock: service_discovery });
});

app.listen(PORT, () => console.log(`CLOCK Server running on ${PORT}`));
