let challengeId;

function fillChallenge(challenge) {
  challengeId = challenge.challengeId;
  const img = document.querySelector("#gameImg");
  img.src = challenge.image;
  const fruitObfuscated = document.querySelector("#fruitName");
  fruitObfuscated.innerHTML = challenge.obfuscatedText;
}

function submitGuess(guess) {
  if (challengeId == undefined) return;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, guess }),
  };
  fetch("http://localhost:3001/guess_the_fruit", requestOptions)
    .then((response) => response.json())
    .then((data) => displayResult(data))
    .catch((error) => console.error("Error:", error));
}

function attachSubmitGuessHandler(option) {
  document.querySelector(option).addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitGuess(document.querySelector(option).value);
    }
  });
}

function displayResult(data) {
  document.querySelector("#gameImg").style.display = "none";
  document.querySelector("#fruitName").style.display = "none";
  document.querySelector("#fruit").style.display = "none";

  const actualContainer = document.querySelector(".gameArea");

  const resultContainer = document.createElement("div");
  resultContainer.id = "resultContainer";

  actualContainer.appendChild(resultContainer);

  const resultMessage = document.createElement("p");
  resultMessage.innerText = data.guessed ? "Correct!\n Score: +2" : "Wrong!";
  resultMessage.style.color = data.guessed ? "green" : "red";
  resultContainer.appendChild(resultMessage);

  const tryAgainButton = document.createElement("button");
  tryAgainButton.innerText = "Try Again";
  resultContainer.appendChild(tryAgainButton);

  tryAgainButton.addEventListener("click", async () => {
    await fetchNewChallenge();
    resultContainer.remove();
  });
}

function fetchNewChallenge() {
  return fetch("http://localhost:3001/random_challenge?difficulty=medium")
    .then((response) => response.json())
    .then((challenge) => {
      fillChallenge(challenge);
      document.querySelector("#gameImg").style.display = "initial";
      document.querySelector("#fruitName").style.display = "initial";
      document.querySelector("#fruit").style.display = "initial";
      document.querySelector("#fruit").value = "";
    })
    .catch((error) => console.error("Error:", error));
}

fetchNewChallenge();

attachSubmitGuessHandler("#fruit");

logout = (event) => {
  event.preventDefault();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://localhost:3001/logout", requestOptions)
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((error) => console.error("Error:", error));
};
