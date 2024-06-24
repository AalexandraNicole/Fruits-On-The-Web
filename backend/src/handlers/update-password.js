const { getBody } = require("../utils/utils");

async function updatePasswordHandler(req, res, services) {
  const body = await getBody(req);

  const db = services.get("mongodb")?.db;
  if (db == null) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }

  const pass = body.newPass;
  try {
    const userEmail = req.user.email;
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    const updated = await db
      .collection("users")
      .updateOne({ email: userEmail }, { $set: { password: pass } });
    console.log("Updated pass: ", pass);
    if (updated.modifiedCount > 0) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ success: true, pass }));
    } else {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ error: "Failed to update score" }));
    }
  } catch (error) {
    console.error("Error updating score:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

module.exports = updatePasswordHandler;
