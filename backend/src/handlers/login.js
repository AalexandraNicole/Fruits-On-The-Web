const { getBody } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey";

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
    const success = result.success;
    console.log("User authenticated successfully:", email);
    const token = jwt.sign({email}, SECRET_KEY, {expiresIn: '1h'}) ;

     res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    });
    res.end(JSON.stringify({ token, success }));
  } else if (!result.success) {
      const success = result.success;
      const token = result.message;
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      });
      res.end(JSON.stringify({ token, success }));
    } else {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end(result.message);
  }
}

module.exports = loginHandler;
