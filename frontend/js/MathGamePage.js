let menuButton = document.querySelector(".openMen");
let menuBar = document.querySelector(".menuBar");
let menuButtons = document.querySelectorAll(".menuButtons");
let rankBox = document.querySelector(".ranksBox");
let doctorBox = document.querySelector(".doctorBox");
let doctorButton = document.querySelector(".doctorButton");
let nameYear = document.querySelector(".nameYear");
let contact = document.querySelector(".contact");
let about = document.querySelector(".about");
let admin = document.querySelector(".admin");
let infoP = document.querySelector(".infoP");
let terms = document.querySelector(".terms");
let privacy = document.querySelector(".privacy");
let trigger = 1;

function showMenu() {
  if (trigger === 1) {
    menuButton.style.backgroundImage = "url('../images/menuOpen.png')";
    menuBar.style.visibility = "hidden";
    trigger = 0;
  } else {
    menuButton.style.backgroundImage = "url('../images/menuClose.webp')";
    menuBar.style.visibility = "visible";
    trigger = 1;
  }
}

function showMenuButtons() {
  menuButtons.forEach(function (button) {
    button.style.visibility = "visible";
  });

  nameYear.style.visibility = "visible";
  contact.style.visibility = "visible";
  about.style.visibility = "visible";
  admin.style.visibility = "visible";
  infoP.style.visibility = "visible";
  privacy.style.visibility = "visible";
  terms.style.visibility = "visible";

  menuBar.scroll = 0;
}

function hideMenuButtons() {
  menuButtons.forEach(function (button) {
    button.style.visibility = "hidden";
  });

  nameYear.style.visibility = "hidden";
  contact.style.visibility = "hidden";
  about.style.visibility = "hidden";
  admin.style.visibility = "hidden";
  infoP.style.visibility = "hidden";
  privacy.style.visibility = "hidden";
  terms.style.visibility = "hidden";
}

function showRanks() {
  rankBox.style.visibility = "visible";
}

function hideRanks() {
  rankBox.style.visibility = "hidden";
}

function showDoctorBox() {
  doctorButton.style.backgroundImage = "url('../images/meds.gif')";
  doctorBox.style.visibility = "visible";
}

function hideDoctorBox() {
  doctorButton.style.backgroundImage = "url('../images/med.gif')";
  doctorBox.style.visibility = "hidden";
}

let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;
let challengeId;

document.getElementById("startreset").onclick = function () {
  console.log("Start/Reset button clicked");
  if (playing === true) {
    location.reload();
  } else {
    console.log("Starting the game");
    playing = true;
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining");
    timeremaining = 10;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    show("choices");
    show("instruction");
    show("score");
    hide("gameOver");

    document.getElementById("startreset").innerHTML = "Exit";

    startCountdown();
    generateQA();
  }
};

for (let i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing === true) {
      if (this.innerHTML == correctAnswer) {
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);
        generateQA();
      } else {
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 500);
        generateQA();
      }
    }
  };
}

function fetchScore(score){
  const token = localStorage.getItem("token");
  console.log("UPDATE SCORE FOR: ", token);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, token }),
  };
  fetch("http://localhost:3001/update_score", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if(data){
        console.log("Score updated status: ", data.success, " SCORE: ", data.newScore);
      }
    })
    .catch((error) => console.error("Error:", error));
}


function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining === 0) {
      stopCountdown();
      show("gameOver");

      document.getElementById("gameOver").innerHTML =
        "<p>Time's up!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      fetchScore(score);

      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(action);
}

function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

function show(Id) {
  document.getElementById(Id).style.display = "block";
}

function generateQA() {
  return fetch("http://localhost:3001/random_math_challenge")
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (!data || !data.fruit1 || !data.fruit2) {
        throw new Error("No data received from server");
      }
      const { fruit1, fruit2, operation, challengeId: id } = data;

      correctAnswer = eval(`${fruit1._id} ${operation} ${fruit2._id}`);
      challengeId = id;
      var element = document.getElementById("question");

      element.innerHTML = `${fruit1.images} + ${fruit2.images}`;        

      const correctPosition = 1 + Math.round(3 * Math.random());
      document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

      const answers = [correctAnswer];
      for (let i = 1; i < 5; i++) {
        if (i !== correctPosition) {
          let wrongAnswer;
          do {
            wrongAnswer = getRandomInt(1, 10);
          } while (answers.includes(wrongAnswer));
          document.getElementById("box" + i).innerHTML = wrongAnswer;
          answers.push(wrongAnswer);
        }
      }
    })
    .catch(error => console.error('Error geting question:', error));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
