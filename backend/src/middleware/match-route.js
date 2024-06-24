const url = require("url");

function notFound(res) {
  res.writeHead(404, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
  });
  res.end("Not Found");
}

function unauthorized(res) {
  res.writeHead(401, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end();
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
    if (route.protected) {
      const authenticated = req.user;
      if (authenticated) {
        route.handler(req, res, services, query);
      } else {
        unauthorized(res);
      }
    } else {
      route.handler(req, res, services, query);
    }
  } else {
    notFound(res);
  }
}

module.exports = matchRoute;
