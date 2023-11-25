document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.form-sign');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        try {
            const response = await fetch('http://localhost:3010/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("loginId", data.accessToken)
                // sessionStorage.getItem("loginId")
                location.href = 'main.html'
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    });
});
