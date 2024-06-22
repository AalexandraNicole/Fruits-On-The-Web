
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
      const adminStatus = profileData.adminStatus;
      // Populate profile data in the HTML
      document.querySelector("#usernamebig").textContent = username;
      document.querySelector("#username").textContent = username;
      document.querySelector("#email").textContent = profileData.email;
      document.querySelector("#scorebig").textContent = score;
      document.querySelector("#score").textContent = score;
      document.querySelector("#adminStatus").textContent = adminStatus ? "Admin" : "User";
    })
    .catch((error) => console.error("Error-fetchProfile:", error));
};

window.onload = fetchProfile();