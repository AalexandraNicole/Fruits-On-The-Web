let menuButton = document.querySelector(".openMen");
let menuBar = document.querySelector(".menuBar");
let menuButtons = document.querySelectorAll(".menuButtons");
let rankBox = document.querySelector(".ranksBox");
let doctorBox = document.querySelector(".doctorBox");
let doctorButton = document.querySelector(".doctorButton");
let trigger = 1;

function showMenu() {
    if (trigger === 1) {
        menuButton.style.backgroundImage = "url('images/menuOpen.png')";
        menuBar.style.visibility = "hidden";
        trigger = 0;
    } else {
        menuButton.style.backgroundImage = "url('images/menuClose.webp')";
        menuBar.style.visibility = "visible";
        trigger = 1;
    }
};

function showMenuButtons() {
    menuButtons.forEach(function (button) {
        button.style.visibility = "visible";
    })
};

function hideMenuButtons() {
    menuButtons.forEach(function (button) {
        button.style.visibility = "hidden";
    })
};

function showRanks() {
    rankBox.style.visibility = "visible";
}

function hideRanks() {
    rankBox.style.visibility = "hidden";
}

function showDoctorBox() {
    doctorButton.style.backgroundImage = "url('images/meds.gif')";
    doctorBox.style.visibility = "visible";
}

function hideDoctorBox() {
    doctorButton.style.backgroundImage = "url('images/med.gif')";
    doctorBox.style.visibility = "hidden";
}
