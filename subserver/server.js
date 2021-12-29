const express = require("express"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8002 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ sub: service_discovery });
});

app.post("/sub", function (req, res) {
  console.log(`SUB server got `, req.query);
  const { x, y } = req.query;
  const z = Number(x) - Number(y);
  res.json({ x, y, z });
});

app.listen(PORT, () => console.log(`SUBTRACT Server running on ${PORT}`));
