
function verifyToken(token){
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  };
  fetch("http://localhost:3001/authorization", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if(data){
        if(!data.success){
          window.location.href = 'loginPage.html';
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}


window.onload = function() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'loginPage.html';
  }else{
    verifyToken(token);
  }
}