document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.style.display = 'flex';
  chatContainer.style.flexDirection = 'column';
  chatContainer.style.zIndex = '1000';

  // Create a div for chat messages
  const chatMessages = document.createElement('div');
  chatMessages.style.flex = '1';
  chatMessages.style.padding = '10px';
  chatMessages.style.overflowY = 'auto';
  chatMessages.style.border = '1px solid #ddd';
  chatMessages.style.backgroundColor = '#f9f9f9';
  chatContainer.appendChild(chatMessages);

  // Add a welcome message
  const welcomeMessage = document.createElement('div');
  welcomeMessage.style.margin = '10px 0';
  welcomeMessage.style.padding = '8px';
  welcomeMessage.style.backgroundColor = '#d9edf7';
  welcomeMessage.style.borderRadius = '5px';
  welcomeMessage.innerHTML = `<strong>Bot:</strong> Welcome! How can I help you today?`;
  chatMessages.appendChild(welcomeMessage);

  // Input container
  const inputContainer = document.createElement('div');
  inputContainer.style.display = 'flex';
  inputContainer.style.borderTop = '1px solid #ddd';
  inputContainer.style.padding = '10px';
  inputContainer.style.backgroundColor = '#fff';
  chatContainer.appendChild(inputContainer);

  // Input field for user input
  const userInput = document.createElement('input');
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('placeholder', 'Ask me anything...');
  userInput.style.flex = '1';
  userInput.style.padding = '10px';
  userInput.style.border = '1px solid #ccc';
  userInput.style.borderRadius = '5px';
  userInput.style.boxSizing = 'border-box';
  inputContainer.appendChild(userInput);

  // Handle Enter key to send message
  userInput.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
      const userMessage = userInput.value.trim();
      if (userMessage) {
        addMessage('You', userMessage);
        userInput.value = ''; // Clear the input field
        const botResponse = await fetchBotResponse(userMessage); // Call the backend API
        addMessage('Bot', botResponse);
      }
    }
  });

  // Function to add message to the chat
  function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.margin = '10px 0';
    messageDiv.style.padding = '8px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.backgroundColor = sender === 'You' ? '#e0f7fa' : '#f1f8e9';
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
  }

  // Function to fetch dynamic bot response from backend
  async function fetchBotResponse(userMessage) {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat', { // Replace '/api/chat' with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.answer || "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return "Oops! Something went wrong. Please try again.";
    }
  }
});
