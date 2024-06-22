const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

window.onload = localStorage.clear();
registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

login = (event, form) => {
  event.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  fetch("http://localhost:3001/login", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);  // store the token for later verifycation
      window.location.href = "loggedPage.html";   // redirect to the logged-in page
    })
    .catch((error) => console.error("Error:", error));
};

register = (event, form) => {
  event.preventDefault();
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  };
  fetch("http://localhost:3001/register", requestOptions)
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((error) => console.error("Error:", error));
};
