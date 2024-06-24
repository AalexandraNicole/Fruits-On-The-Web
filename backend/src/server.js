const http = require("http");
const routes = require("./routes");
const matchRoute = require("./middleware/match-route");
const verifyToken = require("./middleware/verify-token");
const mongoDb = require("./services/mongo-db");

(async () => {
  const mongoDbService = await mongoDb();
  const services = new Map([["mongodb", mongoDbService]]);

  const server = http.createServer(async (req, res) => {
    verifyToken(req, res);
    await matchRoute(req, res, routes, services);
  });

  server.listen(3001, () => {
    console.log("Server running at http://localhost:3001/");
  });
})();
