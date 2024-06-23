const {getRandomInt}  = require("../utils/utils");

async function getRandomMathChallengeHandler(_, res, services, query) {
  const db = services.get("mongodb")?.db;
  if (db == null) {
    console.log("No db connection");
    res.writeHead(500);
    res.end();
    return;
  }


  try {
    const num1 = getRandomInt(1, 3);
    const num2 = getRandomInt(1, 3);
    const operation = '+';

    const fruitsCollection = db.collection("fruits");
    const fruits = await fruitsCollection.find().toArray();

    // Check if fruits array is not empty
    if (fruits.length === 0) {
      throw new Error("No fruits found in the collection");
    }

    const fruit1 = fruits[getRandomInt(0, fruits.length)];
    const fruit2 = fruits[getRandomInt(0, fruits.length)];

    const generateFruitImages = (fruit, num) => {
        let images = '';
        for (let i = 0; i < num; i++) {
            images += `<img src='${fruit.image}' alt='Fruit Image'> `;
        }
        return images;
    };
    const fruitImages1 = generateFruitImages(fruit1, num1);
    const fruitImages2 = generateFruitImages(fruit2, num2);

    const challenge = {
        fruit1: {
            _id: num1,
            images: fruitImages1,
        },
        fruit2: {
            _id: num2,
            images: fruitImages2,
        },
        operation,
        challengeId: `${fruit1._id}-${operation}-${fruit2._id}`, 
    };


    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify(challenge));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

module.exports = getRandomMathChallengeHandler;
