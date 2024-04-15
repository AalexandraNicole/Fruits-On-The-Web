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
};

function showMenuButtons() {
    menuButtons.forEach(function (button) {
        button.style.visibility = "visible";
    })

    nameYear.style.visibility = "visible";
    contact.style.visibility = "visible";
    about.style.visibility = "visible";
    admin.style.visibility = "visible";
    infoP.style.visibility = "visible";
    privacy.style.visibility = "visible";
    terms.style.visibility = "visible";

    menuBar.scroll = 0;
};

function hideMenuButtons() {
    menuButtons.forEach(function (button) {
        button.style.visibility = "hidden";
    })

    nameYear.style.visibility = "hidden";
    contact.style.visibility = "hidden";
    about.style.visibility = "hidden";
    admin.style.visibility = "hidden";
    infoP.style.visibility = "hidden";
    privacy.style.visibility = "hidden";
    terms.style.visibility = "hidden";
};

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

var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function () {
    if (playing == true) {
        location.reload();
    }
    else {
        playing = true;
        score = 0;

        document.getElementById("scorevalue").innerHTML = score;
        //show count
        show("timeremaining");
        timeremaining = 60;

        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //show choices
        show("choices");
        show("instruction");
        show("score");

        //hide game over
        hide("gameOver");

        //change start to reset        
        document.getElementById("startreset").innerHTML = "Exit";

        //start count
        startCountdown();

        //generate quetion
        generateQA();

    }
}

for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {

                //increase score
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();

            } else {
                //wrong answer
                //increase score
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 500);
                generateQA();
            }
        }
    }
}

//functions
//start count
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;


        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameOver");

            //game over            
            document.getElementById("gameOver").innerHTML = "<p>Time's up!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;

            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

//stop count
function stopCountdown() {
    clearInterval(action);
}

//hide
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//guestion
function getRandomFruitImageUrl() {
    var fruitImages = [
        "../images/apple.jpg",
        "../images/orange.jpg",
        "../images/mango.avif",
        "../images/lime.jpg",
        "../images/lemon.avif"
        // Add more URLs as needed
    ];
    return fruitImages[Math.floor(Math.random() * fruitImages.length)];
}

function generateQA() {
    var x = 1 + Math.round(2 * Math.random());
    var y = 1 + Math.round(2 * Math.random());
    correctAnswer = x + y;

    // Generate a random fruit image URL
    var fruitImageUrl = getRandomFruitImageUrl();

    if( x == 0 ){
        document.getElementById("question").innerHTML = "<img src='../images/zero.jpg' alt='Fruit Image'> " + " + " + generateFruitImages(y);
    }else if( y == 0){
        document.getElementById("question").innerHTML = generateFruitImages(x) + " + " + "<img src='../images/zero.jpg' alt='Fruit Image'> ";
    } else {
        // Set question with fruit images and operator
        document.getElementById("question").innerHTML = generateFruitImages(x) + " + " + generateFruitImages(y);
    }
    // Check if either group has more than four images
    var xImages = document.querySelectorAll("#question .x-image").length;
    var yImages = document.querySelectorAll("#question .y-image").length;
    if (xImages > 4) {
        document.getElementById("question").classList.add("x-multiple-lines");
    } else {
        document.getElementById("question").classList.remove("x-multiple-lines");
    }
    if (yImages > 4) {
        document.getElementById("question").classList.add("y-multiple-lines");
    } else {
        document.getElementById("question").classList.remove("y-multiple-lines");
    }

    var correctPosition = 1 + Math.round(3 * Math.random());

    // Set correct answer
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;//correct answer

    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 +
                    Math.round(2 * Math.random())) * (1 +
                        Math.round(1 * Math.random()));//wrong answer

            } while (answers.indexOf(wrongAnswer) > -1)

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

// Function to generate a string of fruit images based on a number
function generateFruitImages(number) {
    var fruitImageUrl = getRandomFruitImageUrl();
    var images = "";
    for (var i = 0; i < number; i++) {
        images += "<img src='" + fruitImageUrl + "' alt='Fruit Image'> ";
    }
    return images;
}

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('container');
    var startButton = document.getElementById('startreset');
    var backgroundState = 'first';
  
    startButton.addEventListener('click', function() {
      if (backgroundState === 'first') {
        container.style.background = 'url("")';
        backgroundState = 'second';
      } else {
        container.style.background = 'url("../images/MathGround.jpg")';
        backgroundState = 'first';
      }
    });
  });