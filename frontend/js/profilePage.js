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

function getAuthorizationHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

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

function showEditPass() {
  resetPass.style.visibility = "visible";
}

logout = () => {
  localStorage.removeItem("token");
  window.location.href =
    "http://127.0.0.1:5501/frontend/html/MainUnloggedPage.html";
};

function updateRanksBox(ranks) {
  const ranksBox = document.querySelector(".ranksBox ul");
  ranksBox.innerHTML = "";

  ranks.forEach((rank) => {
    const li = document.createElement("li");
    li.textContent = rank;
    ranksBox.appendChild(li);
  });
}

function parseRSSFeed(rssText) {
  const parser = new DOMParser();
  const rssDoc = parser.parseFromString(rssText, "application/xml");

  const items = rssDoc.querySelectorAll("item");
  const ranks = [];

  items.forEach((item) => {
    const title = item.querySelector("title").textContent;
    ranks.push(title);
  });

  updateRanksBox(ranks);
}

function fetchRSSFeed() {
  return fetch("http://localhost:3001/rss", {
    method: "GET",
    headers: {
      "Content-Type": "application/rss+xml",
      ...getAuthorizationHeader(),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.text();
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        throw new Error("Failed to load RSS feed");
      }
    })
    .then((rssText) => parseRSSFeed(rssText))
    .catch((error) => console.error("Error:", error));
}

fetchRSSFeed();
