const { MongoClient } = require("mongodb");
const { connectionString, dbName } = require("../environment");

async function initDb() {
  try {
    const client = new MongoClient(connectionString);
    // Connect to the MongoDB server
    await client.connect();
    // Specify database
    const db = client.db(dbName);

    console.log("Connection to database succeeded");
    return {
      client,
      db,
    };
  } catch (err) {
    console.error("Connection to database failed");
    throw err;
  }
}

module.exports = initDb;
