document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)

      if (data.ok) {
        alert("Login successful!");
      } else {
        document.getElementById("error").textContent = data.message;
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("error").textContent =
        "An error occurred. Please try again.";
    }
  });
