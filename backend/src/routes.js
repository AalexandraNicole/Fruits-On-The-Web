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
    url: "/update_score",
    handler: handlers.updateScoreHandler,
  },
  {
    method: "OPTIONS",
    url: "/update_score",
    handler: handlers.optionsHandler,
  },
  {
    method: "POST",
    url: "/authorization",
    handler: handlers.authorizationHandler,
  },
  {
    method: "OPTIONS",
    url: "/authorization",
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
  {
    method: "GET",
    url: "/profile",
    handler: handlers.profileHandler, 
  },
  {
    method: "GET",
    url: "/users",
    handler: handlers.usersHandler, 
  },
  {
    method: "GET",
    url: "/user_delete",
    handler: handlers.usersDeleteHandler, 
  },
  {
    method: "GET",
    url: "/admin",
    handler: handlers.adminHandler, 
  },
  {
    method: "GET",
    url: "/random_math_challenge",
    handler: handlers.getRandomMathChallengeHandler,
  },
  {
    method: "GET",
    url: "/contact",
    handler: handlers.contactHandler,
  },
  {
    method: "OPTIONS",
    url: "/contact",
    handler: handlers.optionsHandler,
  },
];

module.exports = routes;
