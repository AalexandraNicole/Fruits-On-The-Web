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
let editProfile = document.querySelector(".editPBox");
let resetPass = document.querySelector(".editPasBox");
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

function showEditProfile() {
  editProfile.style.visibility = "visible";
}

function showEditPass() {
  resetPass.style.visibility = "visible";
}

function fetchProfile(){
  const token = localStorage.getItem("token");
  console.log("TOKEN ", token);
  const forFetch = "http://localhost:3001/profile?email=" + token;
  
  return fetch(forFetch)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to looad data for Profile");
      }
      return response.json();
    })
    .then((profileData) => {

      const username = profileData.username;
      let score = profileData.score;
      if (score == null){
        score = 0;
      }
      const adminStatus = true;//profileData.adminStatus;
      localStorage.setItem("adminStatus", adminStatus ? "Admin" : "User");
      // Populate profile data in the HTML
      document.querySelector("#usernamebig").textContent = username;
      document.querySelector("#username").textContent = username;
      document.querySelector("#email").textContent = profileData.email;
      document.querySelector("#scorebig").textContent = score;
      document.querySelector("#score").textContent = score;
      document.querySelector("#adminStatus").textContent = adminStatus ? "Admin" : "User";
    })
    .catch((error) => console.error("Error:", error));
};

fetchProfile();

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
