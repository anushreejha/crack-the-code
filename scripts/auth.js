let isLoggedIn = false; // This should be managed based on your authentication logic
let username = ''; // Store the username after login

// Function to update the navbar based on login status
function updateNavbar() {
    const userNameElement = document.getElementById('user-name');
    const authButton = document.getElementById('auth-button');

    if (isLoggedIn) {
        userNameElement.textContent = username; // Display the username
        userNameElement.style.display = 'inline'; // Show the username
        authButton.textContent = 'Logout'; // Change button to Logout
    } else {
        userNameElement.style.display = 'none'; // Hide username
        authButton.textContent = 'Login/Signup'; // Change button to Login/Signup
    }
}

// Event listener for the auth button
document.getElementById('auth-button').addEventListener('click', () => {
    if (isLoggedIn) {
        // Handle logout
        isLoggedIn = false;
        username = '';
        updateNavbar();
    } else {
        // Handle login/signup logic here
        const loginForm = prompt("Enter username and password (comma separated):");
        if (loginForm) {
            const [inputUsername, password] = loginForm.split(',');
            if (validateCredentials(inputUsername.trim(), password.trim())) {
                username = inputUsername.trim();
                isLoggedIn = true;
                updateNavbar();
            } else {
                alert("Invalid credentials. Please try again.");
            }
        }
    }
});

// Function to validate username and password
function validateCredentials(username, password) {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/; // Alphanumeric, 3-15 characters
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,20}$/; // Alphanumeric and special chars, 6-20 characters

    return usernameRegex.test(username) && passwordRegex.test(password);
}

// Call updateNavbar on page load
updateNavbar();