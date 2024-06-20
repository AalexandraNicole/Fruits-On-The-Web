const handlers = require("./handlers");

const routes = [
  {
    method: "GET",
    url: "/test",
    handler: handlers.testHandler,
  },
  {
    method: "GET",
    url: "/random_challenge",
    handler: handlers.getRandomChallengeHandler,
  },
  {
    method: "POST",
    url: "/guess_the_fruit",
    handler: handlers.guessTheFruitHandler,
  },
  {
    method: "OPTIONS",
    url: "/guess_the_fruit",
    handler: handlers.optionsHandler,
  },
];

module.exports = routes;
