document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirmPassword").value;
    console.log(username, email, password, confirm_password);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirm_password }),
      });

      const data = await response.json();
      console.log(data);

      // Handle the response from the backend
      if (response.ok && password === confirm_password) {
        console.log("signup successfully");
        window.location.href = "../../AuthRedirect/user.html";
      } else if (password !== confirm_password) {
        alert("password and confirm password should be same");
      } else {
        console.log("error while signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });
