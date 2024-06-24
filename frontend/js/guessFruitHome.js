logout = () => {
  localStorage.removeItem("token");
  window.location.href =
    "http://127.0.0.1:5501/frontend/html/MainUnloggedPage.html";
};
