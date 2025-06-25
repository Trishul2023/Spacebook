function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        usernameError.textContent = 'No account found. Please sign up first.';
        return false;
    }

    // Validate credentials
    if (username !== user.username) {
        usernameError.textContent = 'Username does not match.';
        return false;
    } else {
        usernameError.textContent = '';
    }

    if (password !== user.password) { // In a real app, passwords should be hashed
        passwordError.textContent = 'Incorrect password.';
        return false;
    } else {
        passwordError.textContent = '';
    }

    // Successful login
    alert('Login successful! Welcome back, ' + username + '!');
    window.location.href = 'profile.html'; // Redirect to profile editing page
}
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://your-backend-api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        window.location.href = 'profile.html';
    } else {
        document.getElementById('passwordError').textContent = 'Invalid credentials.';
    }
}
