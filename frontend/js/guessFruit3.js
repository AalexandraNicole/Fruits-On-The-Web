let challengeId;

function getAuthorizationHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

function fillChallenge(challenge) {
  challengeId = challenge.challengeId;
  const img = document.querySelector("#gameImg");
  img.src = challenge.image;
}

function submitGuess(guess) {
  if (challengeId == undefined) return;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify({ challengeId, guess }),
  };
  fetch("http://localhost:3001/guess_the_fruit?difficulty=hard", requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        throw new Error("Failed to load data for verification");
      }
    })
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
  document.querySelector("#fruit").style.display = "none";

  const actualContainer = document.querySelector(".gameArea");

  const resultContainer = document.createElement("div");
  resultContainer.id = "resultContainer";

  actualContainer.appendChild(resultContainer);

  const resultMessage = document.createElement("p");
  resultMessage.innerText = data.guessed ? "Correct!\n Score: +3" : "Wrong!";
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
  return fetch("http://localhost:3001/random_challenge?difficulty=hard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        throw new Error("Failed to load data for verification");
      }
    })
    .then((challenge) => {
      fillChallenge(challenge);
      document.querySelector("#gameImg").style.display = "initial";
      document.querySelector("#fruit").style.display = "initial";
      document.querySelector("#fruit").value = "";
    })
    .catch((error) => console.error("Error:", error));
}

fetchNewChallenge();

attachSubmitGuessHandler("#fruit");

logout = () => {
  localStorage.removeItem("token");
  window.location.href =
    "http://127.0.0.1:5501/frontend/html/MainUnloggedPage.html";
};
