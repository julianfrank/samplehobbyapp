const express = require("express"),
  service_discovery = require("../service_discovery.json"),
  app = express(),
  PORT = 8001 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ add: service_discovery });
});

app.post("/add", function (req, res) {
  console.log(`ADD server\treq.query:`, req.query);
  const { x, y } = req.query;
  const z = Number(x) + Number(y);
  res.json({ x, y, z });
});

app.listen(PORT, () => console.log(`ADD Server\tRunning on ${PORT}`));
