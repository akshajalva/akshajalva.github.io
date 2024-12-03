document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.style.display = 'none'; // Initially hide the chat container

  // Create the chat toggle icon
  const chatIcon = document.createElement('div');
  chatIcon.id = 'chat-icon';
  chatIcon.style.position = 'fixed';
  chatIcon.style.bottom = '20px';
  chatIcon.style.right = '35px';
  chatIcon.style.backgroundColor = '#e8d5c3'; // Brownish white color
  chatIcon.style.borderRadius = '50px'; // Rounded corners for a box shape
  chatIcon.style.width = '60px'; // Width for a bigger box
  chatIcon.style.height = '60px'; // Height for a bigger box
  chatIcon.style.display = 'flex';
  chatIcon.style.justifyContent = 'center';
  chatIcon.style.alignItems = 'center';
  chatIcon.style.cursor = 'pointer';
  chatIcon.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
  chatIcon.style.zIndex = '1000';

  // Add chatbot image to the chat icon
  const chatIconImg = document.createElement('img');
  chatIconImg.src = 'images/chatboticon.jpg'; // Replace with the actual path to your image
  chatIconImg.alt = 'Chatbot Icon';
  chatIconImg.style.width = '60px'; // Adjust the image size
  chatIconImg.style.height = '60px'; // Adjust the image size
  chatIconImg.style.borderRadius = '50%'; // Optional: adjust corners of the image
  chatIconImg.style.objectFit = 'cover'; // Ensure the image covers the container completely
  chatIcon.appendChild(chatIconImg);

  document.body.appendChild(chatIcon);

  // Create the "Chat with Me" text (outside the icon)
  // const chatText = document.createElement('div');
  // chatText.id = 'chat-text';
  // chatText.innerHTML = 'Chat with Me';
  // chatText.style.position = 'fixed';
  // chatText.style.bottom = '90px'; // Position it above the icon
  // chatText.style.right = '15px'; // Align it to the right
  // chatText.style.color = '#A8D8FF'; // Whitish blue color for the text
  // chatText.style.fontSize = '15px'; // Bigger font size
  // chatText.style.fontWeight = 'bold'; // Bold text
  // chatText.style.zIndex = '1000';
  // document.body.appendChild(chatText);

  // Show/Hide chat container when the icon is clicked
  chatIcon.addEventListener('click', function () {
    if (chatContainer.style.display === 'none') {
      chatContainer.style.display = 'flex';
    } else {
      chatContainer.style.display = 'none';
    }

    // Hide the chat icon and text when clicked 
    chatText.style.display = 'none';
  });

   // Add a header to the chat container
   const chatHeader = document.createElement('div');
   chatHeader.style.backgroundColor = '#A8D8FF';
   chatHeader.style.color = 'white';
   chatHeader.style.padding = '10px';
   chatHeader.style.fontSize = '16px';
   chatHeader.style.fontWeight = 'bold';
   chatHeader.style.textAlign = 'center';
   chatHeader.textContent = 'Chat with Me!';
   chatHeader.style.borderTopLeftRadius = '10px';
   chatHeader.style.borderTopRightRadius = '10px';
   chatContainer.appendChild(chatHeader);
 
   // Set up the chat container layout
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
  welcomeMessage.innerHTML = `<strong>Bot:</strong> Welcome! What do you want to know about Akshaj?`;
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
  userInput.setAttribute('placeholder', 'Type your Question');
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
      const response = await fetch('http://127.0.0.1:8000/chat', { // Replace '/api/chat' with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.response || "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return "Oops! Something went wrong. Please try again.";
    }
  }
});
