const form = document.getElementById("logInForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  try {
    const response = fetch(
      "http://stmapi-env-1.eba-ihzgwh9t.us-east-1.elasticbeanstalk.com/verifyAdmin",
      {
        method: "POST",
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );

    const data = (await response).json();
    data.then((message) => {
      if (message.status == true) {
        window.location.href = "main.html";
      } else {
       const error = document.getElementById("error_message");
        error.style.visibility = "visible";
      }
    });
  } catch (error) {
    console.log(error);
  }
});
