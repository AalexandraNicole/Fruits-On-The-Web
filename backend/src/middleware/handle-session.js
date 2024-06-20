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
  const sessionId = cookies.sessionId;
  if (sessionId && sessionStore[sessionId]) {
    req.session = sessionStore[sessionId];
  } else {
    const newSessionId = uuidv4();
    req.session = {};
    sessionStore[newSessionId] = req.session;
    res.setHeader("Set-Cookie", `sessionId=${newSessionId}`);
  }
}

module.exports = handleSession;
