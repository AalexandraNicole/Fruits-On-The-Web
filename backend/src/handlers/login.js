const { getBody } = require("../utils/utils");
const bcrypt = require("bcrypt");

async function authenticate(email, password, db) {
  try {
    const users = db.collection("users");
    const user = await users.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return { success: false, message: "User not found" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Incorrect password for user:", email);
      return { success: false, message: "Incorrect password" };
    }

    console.log("User authenticated successfully:", email);
    return { success: true, user };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return { success: false, message: "Error authenticating user" };
  }
}

async function loginHandler(req, res, services, query) {
  const db = services.get("mongodb")?.db;
  if (db == null) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }

  const { email, password } = await getBody(req);
  const result = await authenticate(email, password, db);

  if (result.success) {
    req.session.isAuthenticated = true;
    res.writeHead(301, {
      Location:
        "http://127.0.0.1:5500/Fruits-On-The-Web/frontend/html/loggedPage.html",
      "Access-Control-Allow-Origin": "*",
    });
    res.end();
  } else {
    req.session.isAuthenticated = false;
    res.writeHead(401, { "Content-Type": "text/plain" });
    res.end(result.message);
  }
}

module.exports = loginHandler;
