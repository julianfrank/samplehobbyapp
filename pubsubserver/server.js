const service_discovery = require("../service_discovery.json"),
  express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = 8088 || process.env.PORT,
  http = require("http"),
  server = http.createServer(app),
  { Server } = require("socket.io"),
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

console.log("PUBSUB Server CORS", corsOptions);

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log(`a user with id:${socket.id} connected`);
  socket.on("disconnect", (reason) =>
    console.log(`user with id:${socket.id} disconnected with reason:${reason}`)
  );
  socket.on("add",(...args)=>{
    console.log(args)
  })
});

app.get("/", function (req, res) {
  res.json({ subpub: service_discovery });
});

server.listen(PORT, () => console.log(`PUBSUB Server running on ${PORT}`));
