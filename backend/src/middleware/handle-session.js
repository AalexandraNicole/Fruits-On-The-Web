const querystring = require("querystring");
const { v4: uuidv4 } = require("uuid");

async function handleSession(req, res, services) {
  const sessionStore = services.get("sessionStore");
  if (sessionStore == null) {
    console.log("Session store missing");
    res.writeHead(500);
    res.end();
    return;
  }

  const cookies = querystring.parse(req.headers.cookie, "; ");
  let sessionId = cookies.sessionId;

  if (!sessionId || !sessionStore[sessionId]) {
    sessionId = uuidv4(); 
    sessionStore[sessionId] = {};
    res.setHeader("Set-Cookie", `sessionId=${sessionId}`);
  }

  req.session = sessionStore[sessionId]; 
}

module.exports = handleSession;
