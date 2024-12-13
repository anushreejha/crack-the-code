const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const chatHistory = document.getElementById('chat-history');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        messageInput.value = ''; // Clear input after sending
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
    }
});
