const { getBody } = require("../utils/utils");
const bcrypt = require("bcrypt");

async function register(username, email, password, db) {
  const users = db.collection("users");
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    console.log("Email already taken:", email);
    return { success: false, message: "Email already taken" };
  }

  const adminStatus = "false";
  let score = 0;

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({
    username,
    email,
    password: hashedPassword,
    score,
    adminStatus,
  });
  return { success: true };
}

async function registerHandler(req, res, services, query) {
  const db = services.get("mongodb")?.db;
  if (db == null) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }

  const { username, email, password } = await getBody(req);
  const result = await register(username, email, password, db);

  if (result.success) {
    res.writeHead(301, {
      Location: "http://127.0.0.1:5501/frontend/html/loginPage.html#",
      "Access-Control-Allow-Origin": "*",
    });
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(result.message);
  }
}

module.exports = registerHandler;
