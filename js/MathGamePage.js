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

        //hide game over
        hide("gameOver");

        //change start to reset        
        document.getElementById("startreset").innerHTML = "Reset Game";

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
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
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
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
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
        "../images/mstrawberry.jpg",
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
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;

    // Generate a random fruit image URL
    var fruitImageUrl = getRandomFruitImageUrl();

    // Set question with fruit images and operator
    document.getElementById("question").innerHTML = generateFruitImages(x) + " x " + generateFruitImages(y);

    var correctPosition = 1 + Math.round(3 * Math.random());

    // Set correct answer
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;//correct answer

    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 +
                    Math.round(9 * Math.random())) * (1 +
                        Math.round(9 * Math.random()));//wrong answer

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