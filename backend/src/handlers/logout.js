async function logoutHandler(req, res, services, query) {
  req.session.isAuthenticated = false;
  console.log("User logout");
  res.writeHead(302, {
    Location:
      "http://127.0.0.1:5500/Fruits-On-The-Web/frontend/html/MainUnloggedPage.html",
    "Access-Control-Allow-Origin": "*",
  });
  res.end();
}

module.exports = logoutHandler;
