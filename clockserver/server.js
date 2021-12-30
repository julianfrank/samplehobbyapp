const service_discovery = require("../service_discovery.json"),
  io = require("socket.io-client")
  const PUBSUBURL = service_discovery.dev.pubsub,socket = io(PUBSUBURL, { transports: ["websocket", "polling"] });

console.log(`Clock Server\tTrying to connect to PUBSUBURL:${PUBSUBURL}`);

socket.on("connect", () => {
  console.log(`Clock Server\tSocket with ID:${socket.id} Connected`);

  let clockFunc = setInterval(() => {
    socket.emit("CLOCK", new Date());
  }, 4321);

  socket.on("disconnect", (reason) => {
    console.log(
      `Clock Server\tSocket with ID:${socket.id} Disconnected with reason:${reason}`
    );
    clearInterval(clockFunc);
  });
  socket.on("connect_error", (err) => {
    console.log(
      `Clock Server\tConnect Error, Reverting to original connect policy`,
      err
    );
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
    clearInterval(clockFunc);
  });
});
