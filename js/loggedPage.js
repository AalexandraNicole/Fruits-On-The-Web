let menuButton = document.querySelector(".openMen");
let menuBar = document.querySelector(".menuBar");
let menuButtons = document.querySelectorAll(".menuButtons");
let rankBox = document.querySelector(".ranksBox");
let doctorBox = document.querySelector(".doctorBox");
let doctorButton = document.querySelector(".doctorButton");
let menuLine = document.querySelector(".lineMenu");
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
    menuLine.style.width = "11vw";
    nameYear.style.visibility = "visible";
    contact.style.visibility = "visible";
    about.style.visibility = "visible";
    admin.style.visibility = "visible";
    infoP.style.visibility = "visible";
    privacy.style.visibility = "visible";
    terms.style.visibility = "visible";
};

function hideMenuButtons() {
    menuButtons.forEach(function (button) {
        button.style.visibility = "hidden";
    })
    menuLine.style.width = "3vw";
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
    doctorButton.style.backgroundImage = "url('/Fruits-On-The-Web/images/meds.gif')";
    doctorBox.style.visibility = "visible";
}

function hideDoctorBox() {
    doctorButton.style.backgroundImage = "url('/Fruits-On-The-Web/images/med.gif')";
    doctorBox.style.visibility = "hidden";
}
