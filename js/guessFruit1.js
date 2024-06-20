let challengeId;

function fillChallenge(challenge) {
  challengeId = challenge.challengeId;
  const img = document.querySelector("#gameImg");
  img.src = challenge.image;
  const option1 = document.querySelector("#option1");
  option1.innerHTML = challenge.options[0];
  const option2 = document.querySelector("#option2");
  option2.innerHTML = challenge.options[1];
  const option3 = document.querySelector("#option3");
  option3.innerHTML = challenge.options[2];
}

function submitGuess(guess) {
  if (challengeId == undefined) return;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, guess }),
  };
  fetch("http://localhost:3000/guess_the_fruit", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

function attachSubmitGuessHandler(option) {
  document.querySelector(option).addEventListener("click", () => {
    submitGuess(document.querySelector(option).innerHTML);
  });
}

fetch("http://localhost:3000/random_challenge?difficulty=easy")
  .then((response) => response.json())
  .then((challenge) => fillChallenge(challenge))
  .catch((error) => console.error("Error:", error));

attachSubmitGuessHandler("#option1");
attachSubmitGuessHandler("#option2");
attachSubmitGuessHandler("#option3");
