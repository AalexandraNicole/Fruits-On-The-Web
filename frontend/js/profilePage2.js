function getAuthorizationHeader() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

function fetchProfile() {
  const token = localStorage.getItem("token");
  console.log("TOKEN ", token);
  const forFetch = "http://localhost:3001/profile?email=" + token;

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
    .then((profileData) => {
      const username = profileData.username;
      let score = profileData.score;
      if (score == null) {
        score = 0;
      }

      let adminStatus = "User";
      if (profileData.adminStatus === "true") {
        adminStatus = "Admin";
      }
      // Populate profile data in the HTML
      document.querySelector("#usernamebig").textContent = username;
      document.querySelector("#username").textContent = username;
      document.querySelector("#email").textContent = profileData.email;
      document.querySelector("#scorebig").textContent = score;
      document.querySelector("#adminStatus").textContent = adminStatus;
    })
    .catch((error) => console.error("Error-fetchProfile:", error));
}

window.onload = fetchProfile();
