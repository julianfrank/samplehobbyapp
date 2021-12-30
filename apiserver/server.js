const express = require("express"),
  cors = require("cors"),
  axios = require("axios"),
  service_discovery = require("../service_discovery.json");
const app = express(),
  PORT = 8443 || process.env.PORT,
  corsOptions = {
    origin: service_discovery.dev.www,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

console.log("API Server\tCORS", corsOptions);

app.all("/", function (req, res) {
  res.json(service_discovery);
});
app.all("/add", cors(corsOptions), function (req, res) {
  const { port, hostname, pathname, protocol } = new URL(
    service_discovery.dev.add
  );
  //console.log(`API Server\treq.query:`,req.query);
  const { x, y } = req.query;
  console.log(
    `API Server\tTrying to ADD x=${x} + y=${y} using ${protocol}${hostname}:${port}${pathname}`
  );

  axios
    .post(`${service_discovery.dev.add}/add?x=${x}&y=${y}`)
    .then((response) => {
      console.log(`API server\tresponse.data:`, response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error({ error: error.toJSON() });
      res.json({ error: error.toJSON() });
    });
});
app.all("/sub", cors(corsOptions), function (req, res) {
  const { port, hostname, pathname, protocol } = new URL(
    service_discovery.dev.sub
  );
  //console.log(`API Server\treq.query:`,req.query);
  const { x, y } = req.query;
  console.log(
    `API Server\tTrying to SUBTRACT x=${x} - y=${y} using ${protocol}${hostname}:${port}${pathname}`
  );

  axios
    .post(`${service_discovery.dev.sub}/sub?x=${x}&y=${y}`)
    .then((response) => {
      console.log(`API server\tresponse.data:`, response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error({ error: error.toJSON() });
      res.json({ error: error.toJSON() });
    });
});

app.listen(PORT, () => console.log(`API Server\tRunning on ${PORT}`));
