sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim(); // Trim spaces to avoid empty strings with spaces
    const name = document.getElementById('name-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const feedbackType = document.getElementById('feedback-dropdown').value;

    // Validate inputs
    const validationError = validateInputs(email, feedbackType, message);
    if (validationError) {
        alert(validationError);
        return; // Stop further execution
    }

    // Send feedback to the server
    fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, name, email, feedbackType }),
    })
        .then(response => response.json())
        .then(data => {
            // Thank you message on submission
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

// Validate inputs
function validateInputs(email, feedbackType, message) {
    if (feedbackType === 'Select Type') {
        return 'Please select the type of feedback.';
    }
    if (!email || !validateEmail(email)) {
        return 'Please enter a valid email address.';
    }
    if (!message) {
        return 'Please enter a message before sending.';
    }
    return null; // No errors
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}
