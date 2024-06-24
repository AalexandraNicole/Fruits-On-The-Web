function getAuthorizationHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const forFetch = "http://localhost:3001/admin?email=" + token;
  return fetch(forFetch, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        throw new Error("Failed to load data for verification");
      }
    })
    .then((status) => {
      if (status.status !== "true") {
        console.log("UPS YOU ARE NOT ADMIN ", status.status);
        window.location.href = "loginpage.html";
      } else {
        fetchUsers();
      }
    })
    .catch((error) => console.error("Error:", error));
});

function fetchUsers() {
  return fetch("http://localhost:3001/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        throw new Error("Failed to load data for verification");
      }
    })
    .then((data) => {
      const usersContainer = document.getElementById("usersContainer");
      usersContainer.innerHTML = ""; // Clear any existing content

      data.users.forEach((user) => {
        const userElement = document.createElement("div");
        userElement.classList.add("playerBox");

        userElement.innerHTML = `
      <span class="playerName">
      <i class="bx bxs-user"></i>
      ${user.username}
      </span>
      <button class="deleteButton" onclick="deleteUser('${user.email}')">Delete</button>
      <p>Score: ${user.score}</p>
      <p>${user.email}</p>
      `;

        usersContainer.appendChild(userElement);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}

function deleteUser(user_id) {
  console.log("Deleting user: ", user_id);
  const forFetch = "http://localhost:3001/user_delete?id=" + user_id;
  return fetch(forFetch, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        window.location.href = "loginPage.html";
      } else {
        throw new Error("Failed to load data for verification");
      }
    })
    .then((data) => {
      if (data.success) {
        fetchUsers();
      } else {
        console.error("Error deleting user: ", data.error);
      }
    })
    .catch((error) => console.error("Error deleting user:", error));
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const playerBoxes = document.querySelectorAll(".playerBox");

  // Loop through player boxes to hide/show based on search term
  playerBoxes.forEach((playerBox) => {
    const playerName = playerBox
      .querySelector(".playerName")
      .textContent.toLowerCase();
    if (playerName.includes(searchTerm)) {
      playerBox.style.display = "flex";
    } else {
      playerBox.style.display = "none";
    }
  });
});

logout = () => {
  localStorage.removeItem("token");
  window.location.href =
    "http://127.0.0.1:5501/frontend/html/MainUnloggedPage.html";
};
