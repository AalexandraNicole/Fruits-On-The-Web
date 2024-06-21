

async function profileHandler(req, res, services) {
    console.log("Session Object: ", req.session);
    const db = services.get("mongodb")?.db;
    if (db == null) {
        console.log("No db connection");
        res.writeHead(500);
        res.end();
        return;
    }


  const userEmail = req.session.userEmail; // Get email from session
  console.log("Email Session: ", userEmail)
  if (!userEmail) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ceva e putred" }));
    return;
  }

  try {
    const user = await db.collection("users").findOne({ email: userEmail });
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    const profileData = {
      username: user.username,
      email: user.email,
      score: user.score,
      password: user.password,
      adminStatus: user.adminStatus,
    };

    console.log("Profile Data {profileData}");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(profileData));
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}

module.exports = profileHandler;