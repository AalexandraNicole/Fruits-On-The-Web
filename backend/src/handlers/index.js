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
};
