const url = require("url");

function routeNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

function parseUrl(reqUrl) {
  const parsedUrl = url.parse(reqUrl, true);
  return {
    pathname: parsedUrl.pathname,
    query: parsedUrl.query,
  };
}

async function matchRoute(req, res, routes, services) {
  const { pathname, query } = parseUrl(req.url);
  const route = routes.find(
    (route) => route.method === req.method && route.url === pathname
  );
  if (route) {
    route.handler(req, res, services, query);
  } else {
    routeNotFound(res);
  }
}

module.exports = matchRoute;
