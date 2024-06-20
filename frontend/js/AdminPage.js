// Select the search input element
const searchInput = document.getElementById("searchInput");

// Add event listener for input changes
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

// Get the View Reports button and the user reports section
const viewReportsButton = document.getElementById("viewReportsButton");
const userReports = document.getElementById("userReports");
userReports.style.display = "none";

// Add event listener to the View Reports button
viewReportsButton.addEventListener("click", function () {
  // Toggle the display of the user reports section
  if (userReports.style.display === "none") {
    userReports.style.display = "block";
  } else {
    userReports.style.display = "none";
  }
});

logout = (event) => {
  event.preventDefault();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://localhost:3000/logout", requestOptions)
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((error) => console.error("Error:", error));
};
