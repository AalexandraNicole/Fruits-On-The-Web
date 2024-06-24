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

let quotes = [
  "Fruits are an excellent source of essential vitamins and minerals, and they are high in fiber. ",
  "We should all be eating fruits and vegetables as if our lives depend on it - because they do.",
  "Adopting a new healthier lifestyle can involve changing diet to include more fresh fruit and vegetables.",
  "Eating a rainbow of colorful fruits and vegetables is essential for good health.",
  "I try to stick to a vegan diet heavy on fruit and vegetables.",
  "Fruits are snacks, which are rich in vitamins, and can be eaten the whole day. ",
  "If we can get people to focus on fruits and vegetables and more healthy foods, we'll be better in terms of our healthcare. ",
  "The more colorful the food, the better. I try to add color to my diet, which means vegetables and fruits.",
  "Vegetables are a must on a diet. I suggest carrot cake, zucchini bread, and pumpkin pie.",
  "A fruit is a vegetable with looks and money. Plus, if you let fruit rot, it turns into wine.",
  "Adopting a new healthier lifestyle can involve to include more levels of exercise. ",
  "Blueberries, strawberries and blackberries are true super foods.",
  "Drinking freshly made juices and eating whole foods to provide adequate fiber is an approach to a healthful diet.",
  "Stop counting calories and start counting plants. ",
  "Watermelon - it's a good fruit. You eat, you drink, you wash your face.",
  "...the avocado is a food without rival among the fruits, the veritable fruit of paradise.",
  "When you eat, it’s vegetable, when you are sick, it’s medicine. ",
];

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

function showDoctorBox() {
  doctorButton.style.backgroundImage = "url('../images/meds.gif')";
  doctorBox.style.visibility = "visible";
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  doctorBox.innerHTML = randomQuote;
}

function hideDoctorBox() {
  doctorButton.style.backgroundImage = "url('../images/med.gif')";
  doctorBox.style.visibility = "hidden";
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
