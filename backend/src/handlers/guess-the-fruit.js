const ObjectId = require("mongodb").ObjectId;
const { getBody } = require("../utils/utils");

async function guessTheFruitHandler(req, res, services) {
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

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ guessed }));
}

module.exports = guessTheFruitHandler;
