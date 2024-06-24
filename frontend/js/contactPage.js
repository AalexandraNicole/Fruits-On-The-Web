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

function getAuthorizationHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

contactSend = (event, form) => {
  event.preventDefault();
  const message = form.message.value;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify({ message }),
  };
  fetch("http://localhost:3001/contact", requestOptions)
    .then((response) => {
      if (response.status === 201) {
        alert("Message sent successfully!");
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        alert("Server could not send the email");
      }
    })
    .catch((error) => console.error("Error:", error));

  form.reset();
};

logout = () => {
  localStorage.removeItem("token");
  window.location.href =
    "http://127.0.0.1:5501/frontend/html/MainUnloggedPage.html";
};
