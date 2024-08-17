

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
            localStorage.setItem('token', data.accessToken);
            window.location.href = '/frontend/index.html';
        } else {
            document.getElementById("error").textContent = data.error || 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("error").textContent = 'An error occurred. Please try again later.';
    }
});

// Items list
