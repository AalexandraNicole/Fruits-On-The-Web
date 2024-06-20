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
  {
    method: "POST",
    url: "/register",
    handler: handlers.registerHandler,
  },
  {
    method: "POST",
    url: "/login",
    handler: handlers.loginHandler,
  },
  {
    method: "OPTIONS",
    url: "/login",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/register",
    handler: handlers.optionsHandler,
  },
  {
    method: "POST",
    url: "/logout",
    handler: handlers.logoutHandler,
  },
  {
    method: "OPTIONS",
    url: "/logout",
    handler: handlers.optionsHandler,
  },
];

module.exports = routes;
