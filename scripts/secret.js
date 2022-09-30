window.addEventListener("load", () => {
  loadMessage();
  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });
  document.getElementById("secretForm").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSave();
  });

  document.getElementById("secretForm").addEventListener("reset", (e) => {
    e.preventDefault();
    loadMessage();
  });
});

function loadMessage() {
  const targetUrl = "https://vapt-test-app.azurewebsites.net/goodExample/read";
  fetch(targetUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Auth-User": localStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        document.getElementById("message").value = response.message;
      } else {
        window.location.replace("./index.html");
      }
    })
    .catch((err) => {
      console.log(err);
      //   window.location.replace("./index.html");
    });
}

function handleSave() {
  const targetUrl =
    "https://vapt-test-app.azurewebsites.net/goodExample/write";

  let message = document.getElementById("message").value;
  let button = document.getElementById("saveButton");
  button.setAttribute("disabled", true);

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Auth-User": localStorage.getItem("token"),
    },
    body: JSON.stringify({ message: message }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        alert("message saved successfully");
      } else {
        alert("some error occured");
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

function handleLogout() {
  const targetUrl =
    "https://vapt-test-app.azurewebsites.net/goodExample/logout";

  fetch(targetUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        localStorage.removeItem("token");
        window.location.replace("./index.html");
      } else {
        // show error
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
