async function deleteUser(db, userId) {
  const result = await db.collection("users").deleteOne({ email: userId });
  return result.deletedCount > 0;
}

async function usersDeleteHandler(req, res, services, query) {
  const db = services.get("mongodb")?.db;
  if (!db) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }

  const id = query.id;
  try {
    const success = await deleteUser(db, id);
    if (success) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ success }));
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  } catch (error) {
    console.error("Error fetching deletation data:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

module.exports = usersDeleteHandler;
