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

document.getElementById('editFormPassword').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;
  const token = localStorage.getItem('token');

  if (newPass !== confirmPass) {
    alert("Passwords do not match!");
    return;
  }

  const text = "Are you sure you want change your password?";
  if (confirm(text)) {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify({ newPass, token })
    };

    fetch('http://localhost:3001/update_password', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Password updated successfully: ", data.pass);
          window.location.href = "profilePage.html";
        } else {
          console.error("Error updating password:", data.error);
          alert("Error updating password");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error updating password");
      });
  }else {
    console.log("Password updated cancel!");
    window.location.href = "profilePage.html";
  }
  
});
