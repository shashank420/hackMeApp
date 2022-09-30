window.addEventListener("load", () => {
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    handleRegister();
  });
});

function handleRegister() {
  const targetUrl =
    "https://vapt-test-app.azurewebsites.net/goodExample/register";

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  let button = document.getElementById("registerButton");
  button.setAttribute("disabled", true);

  if (confirmPassword !== password) {
    alert("please match your password");
    return;
  }

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
        alert(response.message || "some error occured");
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
