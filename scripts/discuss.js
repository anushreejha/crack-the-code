sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const feedbackType = document.getElementById('feedback-dropdown').value;

    // Email validation check (if an email is entered)
    if (email && !email.includes('@')) {
        alert('Please enter a valid email address.');
        return; // Stop further execution if email is invalid
    }

    // Feedback type validation check
    if (feedbackType === 'Select Type') {
        alert('Please select the type of feedback.');
        return; // Stop further execution if feedback type is not selected
    }

    if (message) {
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
            alert('Thank you for your feedback!'); //Submission alert

            // Clear the input fields after sending
            messageInput.value = '';
            document.getElementById('name-input').value = '';
            document.getElementById('email-input').value = '';
            document.getElementById('feedback-dropdown').selectedIndex = 0; // Reset dropdown
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please enter a message before sending.'); // Alert if message is empty
    }
});
