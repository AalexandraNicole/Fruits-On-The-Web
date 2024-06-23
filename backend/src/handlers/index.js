const testHandler = require("./test");
const getRandomChallengeHandler = require("./get-random-challenge");
const guessTheFruitHandler = require("./guess-the-fruit");
const optionsHandler = require("./options");
const optionsHandlerProfile = require("./profile-options")
const registerHandler = require("./register");
const loginHandler = require("./login");
const logoutHandler = require("./logout");
const profileHandler = require("./profile");
const contactHandler = require("./contact");
const usersHandler = require("./user");
const adminHandler = require("./admin");
const usersDeleteHandler = require("./user-delete");
const getRandomMathChallengeHandler = require("./get-random-math-challenge");
const updateScoreHandler = require("./update_score");
const authorizationHandler = require("./authorization");


module.exports = {
  testHandler,
  getRandomChallengeHandler,
  guessTheFruitHandler,
  optionsHandler,
  registerHandler,
  loginHandler,
  logoutHandler,
  profileHandler,
  contactHandler,
  optionsHandlerProfile,
  usersHandler,
  adminHandler,
  usersDeleteHandler,
  getRandomMathChallengeHandler,
  updateScoreHandler,
  authorizationHandler,
};
