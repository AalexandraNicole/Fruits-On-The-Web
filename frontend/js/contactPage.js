let menuButton = document.querySelector(".openMen");
let menuBar = document.querySelector(".menuBar");
let menuButtons = document.querySelectorAll(".menuButtons");
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
  about.style.visibility = "visible";
  admin.style.visibility = "visible";
  infoP.style.visibility = "visible";
  privacy.style.visibility = "visible";
  terms.style.visibility = "visible";
  contact.style.visibility = "visible";

  menuBar.scroll = 0;
}

function hideMenuButtons() {
  menuButtons.forEach(function (button) {
    button.style.visibility = "hidden";
  });

  nameYear.style.visibility = "hidden";
  about.style.visibility = "hidden";
  admin.style.visibility = "hidden";
  infoP.style.visibility = "hidden";
  privacy.style.visibility = "hidden";
  terms.style.visibility = "hidden";
  contact.style.visibility = "hidden";
}

contactSend = (event, form) => {
  event.preventDefault();
  const message = form.message.value;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  };
  fetch("http://localhost:3001/contact", requestOptions)
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        alert("Message not sent!");
      }
    })
    .catch((error) => console.error("Error:", error));
  alert("Message sent successfully!");
  form.reset();
};
