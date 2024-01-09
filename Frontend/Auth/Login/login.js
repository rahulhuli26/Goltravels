document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    if (email === "admin@gmail.com" && password === "admin@123") {
      window.location.href = "../../AuthRedirect/Admin/admin.html";
    } else if (email === "hotel@gmail.com" && password === "hotel@123") {
      window.location.href = "../../AuthRedirect/hotel.html";
    } else if (email === "staff@gmail.com" && password === "staff@123") {
      window.location.href = "../../AuthRedirect/staff.html";
    } else {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);

        // Handle the response from the backend
        if (response.ok) {
          console.log("login successfully");
          window.location.href = "../../AuthRedirect/user.html";
        } else {
          console.log("error while login");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  });
