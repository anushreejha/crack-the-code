const messageInput = document.getElementById('message-input'); // Get message input
const nameInput = document.getElementById('name-input'); // Get name input
const emailInput = document.getElementById('email-input'); // Get email input
const feedbackDropdown = document.getElementById('feedback-dropdown'); // Get feedback dropdown
const sendButton = document.getElementById('send-button'); // Get send button

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim(); 
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const feedbackType = feedbackDropdown.value;

    // Validate inputs
    const validationError = validateInputs(email, feedbackType, message);
    if (validationError) {
        alert(validationError); // Show the validation error
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
            nameInput.value = '';
            emailInput.value = '';
            feedbackDropdown.selectedIndex = 0; // Reset dropdown
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Validate inputs
function validateInputs(email, feedbackType, message) {
    if (feedbackType === '' || feedbackType === 'Select Type') {
        return 'Please select the type of feedback.'; // Check if feedback type is selected
    }
    if (email && !validateEmail(email)) { // Check if email is provided and valid
        return 'Please enter a valid email address.'; 
    }
    if (!message) {
        return 'Please enter a message before sending.'; // Check if message is provided
    }
    return null; // No errors
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}
