const http = require("http");
const routes = require("./routes");
const matchRoute = require("./middleware/match-route");
const handleSession = require("./middleware/handle-session");
const mongoDb = require("./services/mongo-db");

(async () => {
  const sessionStore = {};
  const mongoDbService = await mongoDb();
  const services = new Map([
    ["mongodb", mongoDbService],
    ["sessionStore", sessionStore],
  ]);

  const server = http.createServer(async (req, res) => {
    await handleSession(req, res, services);
    await matchRoute(req, res, routes, services);
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
})();
