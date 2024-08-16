document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && !data.error) {
          console.log(data);
          // Store the token in localStorage or sessionStorage if needed
          localStorage.setItem('token', data.accessToken);
          // Redirect to another page, e.g., dashboard.html
          window.location.href = '/frontend/index.html';  // Replace with your desired page
      } else {
          // Display the error message returned by the API
          document.getElementById("error").textContent = data.error || 'Login failed. Please try again.';
      }
  } catch (error) {
      console.error('Error:', error);
      document.getElementById("error").textContent = 'An error occurred. Please try again later.';
  }
});
