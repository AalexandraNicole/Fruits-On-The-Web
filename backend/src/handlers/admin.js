async function adminHandler(req, res, services) {
  const db = services.get("mongodb")?.db;
  if (!db) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }
  try {
    const userEmail = req.user.email;
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    const status = { status: user.adminStatus };
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(status));
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

module.exports = adminHandler;
