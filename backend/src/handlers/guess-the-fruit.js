const ObjectId = require("mongodb").ObjectId;
const { getBody } = require("../utils/utils");

async function guessTheFruitHandler(req, res, services, query) {
  const body = await getBody(req);

  const db = services.get("mongodb")?.db;
  if (db == null) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }

  const fruitsCollection = db.collection("fruits");
  const challengedFruit = await fruitsCollection.findOne({
    _id: new ObjectId(body.challengeId),
  });

  const guessed =
    challengedFruit.name.toUpperCase() === body.guess.toUpperCase();

  if (guessed) {
    const userEmail = req.user.email;
    const user = await db.collection("users").findOne({ email: userEmail });
    // const difficulty = query.difficulty;

    if (!user) {
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    let newScore = user.score + 1;
    // if (difficulty === "easy") {
    //   newScore = user.score + 1;
    // } else if (difficulty === "medium") {
    //   newScore = user.score + 2;
    // } else if (difficulty === "hard") {
    //   newScore = user.score + 3;
    // }

    const updated = await db
      .collection("users")
      .updateOne({ email: userEmail }, { $set: { score: newScore } });
    if (updated.modifiedCount <= 0) {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ error: "Failed to update score" }));
      return;
    }
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ guessed }));
}

module.exports = guessTheFruitHandler;
