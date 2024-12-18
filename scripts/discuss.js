sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim(); // Trim spaces to avoid empty strings with spaces
    const name = document.getElementById('name-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const feedbackType = document.getElementById('feedback-dropdown').value;

    // Validate inputs
    if (feedbackType === 'Select Type') {
        alert('Please select the type of feedback.');
        return; // Stop further execution
    }
    if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address.');
        return; // Stop further execution
    }
    if (!message) {
        alert('Please enter a message before sending.');
        return; // Stop further execution
    }

    // If validation passes, send feedback to the server
    fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, name, email, feedbackType }),
    })
        .then(response => response.json())
        .then(data => {
            // Thank you message on successful submission
            alert('Thank you for your feedback!');

            // Clear the input fields after sending
            messageInput.value = '';
            document.getElementById('name-input').value = '';
            document.getElementById('email-input').value = '';
            document.getElementById('feedback-dropdown').selectedIndex = 0; // Reset dropdown
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}
