const http = require("http");
const routes = require("./routes");
const matchRoute = require("./middleware/match-route");
const mongoDb = require("./services/mongo-db");

(async () => {
  const mongoDbService = await mongoDb();
  const services = new Map([["mongodb", mongoDbService]]);

  const server = http.createServer(async (req, res) => {
    await matchRoute(req, res, routes, services);
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
})();
