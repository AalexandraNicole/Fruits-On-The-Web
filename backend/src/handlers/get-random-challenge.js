const { getRandomInt, obfuscateName, shuffleArray } = require("../utils/utils");

async function getRandomChallengeHandler(req, res, services, query) {
  const db = services.get("mongodb")?.db;
  if (db == null) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }

  const difficulty = query.difficulty;

  try {
    const fruitsCollection = db.collection("fruits");
    const fruits = await fruitsCollection.find().toArray();

    // Check if fruits array is not empty
    if (fruits.length === 0) {
      throw new Error("No fruits found in the collection");
    }

    const selectedFruitIndex = getRandomInt(0, fruits.length);
    const selectedFruit = fruits[selectedFruitIndex];

    // Exclude the selected fruit
    const remainingFruits = fruits.filter(
      (_, index) => index !== selectedFruitIndex
    );

    const firstRandomFruit =
      remainingFruits[getRandomInt(0, remainingFruits.length)];
    const remainingFruitsAfterFirst = remainingFruits.filter(
      (fruit) => fruit !== firstRandomFruit
    );

    const secondRandomFruit =
      remainingFruitsAfterFirst[
        getRandomInt(0, remainingFruitsAfterFirst.length)
      ];

    let challenge;
    if (difficulty === "easy") {
      challenge = {
        challengeId: selectedFruit._id,
        image: selectedFruit.image,
        options: shuffleArray([
          selectedFruit.name,
          firstRandomFruit.name,
          secondRandomFruit.name,
        ]),
      };
    } else if (difficulty === "medium") {
      challenge = {
        challengeId: selectedFruit._id,
        image: selectedFruit.image,
        obfuscatedText: obfuscateName(selectedFruit.name),
      };
    } else if (difficulty === "hard") {
      challenge = {
        challengeId: selectedFruit._id,
        image: selectedFruit.image,
      };
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(challenge));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

module.exports = getRandomChallengeHandler;
