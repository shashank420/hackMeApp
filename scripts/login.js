window.addEventListener("load", () => {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin();
  });
});

function handleLogin() {
  const targetUrl =
    "https://vapt-test-app.azurewebsites.net/goodExample/login";

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let button = document.getElementById("loginButton");
  button.setAttribute("disabled", true);

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.success) {
        localStorage.setItem("token", response.token);
        window.location.replace("./secret.html");
      } else {
        alert(response.message);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("some error occured");
    })
    .finally(() => {
      button.removeAttribute("disabled");
    });
}
