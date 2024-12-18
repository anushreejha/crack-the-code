sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const feedbackType = document.getElementById('feedback-dropdown').value;

    // Check if feedback type is still 'Select Type'
    if (feedbackType === 'Select Type') {
        alert('Please select the type of feedback.');
        return; // Stop further execution
    }

    // Check if email is entered and valid
    if (email && !email.includes('@')) {
        alert('Please enter a valid email address.');
        return; // Stop further execution
    }

    // Check if message is empty
    if (!message) {
        alert('Please enter a message before sending.');
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
