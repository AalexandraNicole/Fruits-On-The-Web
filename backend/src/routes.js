const handlers = require("./handlers");

const routes = [
  // protected routes
  {
    method: "GET",
    url: "/random_challenge",
    protected: true,
    handler: handlers.getRandomChallengeHandler,
  },
  {
    method: "POST",
    url: "/guess_the_fruit",
    protected: true,
    handler: handlers.guessTheFruitHandler,
  },
  {
    method: "POST",
    url: "/contact",
    protected: true,
    handler: handlers.contactHandler,
  },
  {
    method: "POST",
    url: "/update_score",
    protected: true,
    handler: handlers.updateScoreHandler,
  },
  {
    method: "GET",
    url: "/profile",
    protected: true,
    handler: handlers.profileHandler,
  },
  {
    method: "GET",
    url: "/users",
    protected: true,
    handler: handlers.usersHandler,
  },
  {
    method: "GET",
    url: "/user_delete",
    protected: true,
    handler: handlers.usersDeleteHandler,
  },
  {
    method: "GET",
    url: "/admin",
    protected: true,
    handler: handlers.adminHandler,
  },
  {
    method: "GET",
    url: "/random_math_challenge",
    protected: true,
    handler: handlers.getRandomMathChallengeHandler,
  },
  {
    method: "GET",
    url: "/rss",
    protected: true,
    handler: handlers.rssHandler,
  },
  // anonymous routes
  {
    method: "GET",
    url: "/test",
    handler: handlers.testHandler,
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
  //options routes
  {
    method: "OPTIONS",
    url: "/update_score",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/contact",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/guess_the_fruit",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/random_challenge",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/register",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/login",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/profile",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/users",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/user_delete",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/admin",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/random_math_challenge",
    handler: handlers.optionsHandler,
  },
  {
    method: "OPTIONS",
    url: "/rss",
    handler: handlers.optionsHandler,
  },
];

module.exports = routes;
