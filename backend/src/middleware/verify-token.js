const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey";

function verifyToken(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return;

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decoded.exp < currentTime) {
      console.log("Token is expired", authHeader);
      return;
    }

    req.user = decoded;
  } catch (error) {
    console.log("Cannot verify token", authHeader);
  }
}

module.exports = verifyToken;
