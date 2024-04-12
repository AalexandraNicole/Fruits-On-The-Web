let menuButton = document.querySelector(".openMen");
let menuBar = document.querySelector(".menuBar");
let menuButtons = document.querySelectorAll(".menuButtons");
let rankBox = document.querySelector(".ranksBox");
let nameYear = document.querySelector(".nameYear");
let contact = document.querySelector(".contact");
let about = document.querySelector(".about");
let admin = document.querySelector(".admin");
let infoP = document.querySelector(".infoP");
let terms = document.querySelector(".terms");
let privacy = document.querySelector(".privacy");
let heart1 = document.querySelector("#firstHeart");
let heart2 = document.querySelector("#secondHeart");
let heart3 = document.querySelector("#thirdHeart");

let trigger = 1;
let heartTrigger1 = 1;
let heartTrigger2 = 1;
let heartTrigger3 = 1;

function showMenu() {
    if (trigger === 1) {
        menuButton.style.backgroundImage = "url('/Fruits-On-The-Web/images/menuOpen.png')";
        menuBar.style.visibility = "hidden";
        trigger = 0;
    } else {
        menuButton.style.backgroundImage = "url('/Fruits-On-The-Web/images/menuClose.webp')";
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

function changeHeart1() {
    if (heartTrigger1 === 1) {
        heart1.style.backgroundImage = "url('/Fruits-On-The-Web/images/emptyHeart.png')";
        heartTrigger1 = 0;
    } else {
        heart1.style.backgroundImage = "url('/Fruits-On-The-Web/images/fullHeart.png')";
        heartTrigger1 = 1;
    }
};

function changeHeart2() {
    if (heartTrigger2 === 1) {
        heart2.style.backgroundImage = "url('/Fruits-On-The-Web/images/emptyHeart.png')";
        heartTrigger2 = 0;
    } else {
        heart2.style.backgroundImage = "url('/Fruits-On-The-Web/images/fullHeart.png')";
        heartTrigger2 = 1;
    }
};

function changeHeart3() {
    if (heartTrigger3 === 1) {
        heart3.style.backgroundImage = "url('/Fruits-On-The-Web/images/emptyHeart.png')";
        heartTrigger3 = 0;
    } else {
        heart3.style.backgroundImage = "url('/Fruits-On-The-Web/images/fullHeart.png')";
        heartTrigger3 = 1;
    }
};
