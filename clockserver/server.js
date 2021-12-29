const service_discovery = require("../service_discovery.json"),
  io = require("socket.io-client"),
  PUBSUBURL = service_discovery.dev.pubsub;

console.log(`Clock Server\tTrying to connect to PUBSUBURL:${PUBSUBURL}`);
const socket = io(PUBSUBURL, { transports: ["websocket", "polling"] });
socket.on("connect", () => {
  console.log(`Clock Server\tSocket with ID:${socket.id} Connected`);

  let clockFunc = setInterval(() => {
    socket.emit("CLOCK", new Date());
  }, 1234);

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
