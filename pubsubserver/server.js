const express = require("express"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8088 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ subpub: service_discovery });
});

app.listen(PORT, () => console.log(`PUBSUB Server running on ${PORT}`));
