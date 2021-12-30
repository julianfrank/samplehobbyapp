const service_discovery = require("../service_discovery.json"),
  axios = require("axios"),
  express = require("express"),
  { Server } = require("socket.io"),
  cors = require("cors"),
  http = require("http");
const app = express(),
  PORT = 8088 || process.env.PORT,
  server = http.createServer(app),
  io = new Server(server, {
    cors: {
      origin: [service_discovery.dev.www, service_discovery.prod.www] /*,
      allowedHeaders: ["my-custom-header"],
      credentials: true*/,
    },
    path: "/socket.io/",
  }),
  corsOptions = {
    origin: service_discovery.dev.www,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

console.log("PUBSUB Server\tCORS:", corsOptions);

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log(`PUBSUB Server\tUser with id:${socket.id} connected`);
  socket.on("disconnect", (reason) =>
    console.log(
      `PUBSUB Server\tUser with id:${socket.id} disconnected with reason:${reason}`
    )
  );
  socket.on("CLOCK", (clockReading) => {
    io.emit("CLOCK", clockReading);
  });
  socket.on("ADD", (x, y) => {
    console.log(`PUBSUB Server\tReceived ADD Event with x:${x},y:${y}`);
    axios
      .post(`${service_discovery.dev.add}/add?x=${x}&y=${y}`)
      .then((response) => {
        console.log(`PUBSUB server\tADD Response:`, response.data);
        socket.emit("ADDRESULT", response.data);
      })
      .catch((error) => {
        console.error({ error: error.toJSON() });
        res.json({ error: error.toJSON() });
      });
  });
  socket.on("SUB", (x, y) => {
    console.log(`PUBSUB Server:\tReceived SUB Event with x:${x},y:${y}`);
    axios
      .post(`${service_discovery.dev.sub}/sub?x=${x}&y=${y}`)
      .then((response) => {
        console.log(`PUBSUB server\tSUB Response:`, response.data);
        socket.emit("SUBRESULT", response.data);
      })
      .catch((error) => {
        console.error({ error: error.toJSON() });
        res.json({ error: error.toJSON() });
      });
  });
});

app.get("/", function (req, res) {
  res.json({ subpub: service_discovery });
});

server.listen(PORT, () => console.log(`PUBSUB Server\tRunning on ${PORT}`));