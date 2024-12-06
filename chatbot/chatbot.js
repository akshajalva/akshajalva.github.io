document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.style.display = 'none'; // Initially hide the chat container

  // Create the chat toggle icon
  const chatIcon = document.createElement('div');
  chatIcon.id = 'chat-icon';
  chatIcon.style.position = 'fixed';
  chatIcon.style.bottom = '20px';
  chatIcon.style.right = '35px';
  // chatIcon.style.backgroundColor = '#e8d5c3'; // Brownish white color
  // chatIcon.style.borderRadius = '50px'; // Rounded corners for a box shape
  // chatIcon.style.width = '60px'; // Width for a bigger box
  // chatIcon.style.height = '60px'; // Height for a bigger box
  // chatIcon.style.display = 'flex';
  // chatIcon.style.justifyContent = 'center';
  // chatIcon.style.alignItems = 'center';
  chatIcon.style.cursor = 'pointer';
  // chatIcon.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
  chatIcon.style.zIndex = '1000';

  // Add chatbot image to the chat icon
  const chatIconImg = document.createElement('img');
  chatIconImg.src = 'images/footer_robot.gif'; // Replace with the actual path to your image
  chatIconImg.alt = 'Chatbot Icon';
  chatIconImg.style.width = '65px'; // Adjust the image size
  chatIconImg.style.height = '65px'; // Adjust the image size
  chatIconImg.style.outline = 'none'; // Remove outline on focus
  chatIconImg.style.border = 'none';  // Remove border
  chatIconImg.addEventListener('focus', (event) => {
    event.target.style.outline = 'none'; // Specifically handle focus event
  });
  chatIconImg.addEventListener('hover', (event) => {
    event.target.style.border = 'none';  // Handle hover for borders
  });
    // Remove any border that might appear
  // chatIconImg.style.borderRadius = '50%'; // Optional: adjust corners of the image
  // chatIconImg.style.objectFit = 'cover'; // Ensure the image covers the container completely
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
   chatHeader.style.backgroundColor = '#d4ebff';
   chatHeader.style.color = 'white';
   chatHeader.style.padding = '10px';
   chatHeader.style.fontSize = '16px';
   chatHeader.style.fontWeight = 'bold';
   chatHeader.style.textAlign = 'center';
   chatHeader.style.borderTopLeftRadius = '10px';
   chatHeader.style.borderTopRightRadius = '10px';
   // Add the main header text
    const headerTitle = document.createElement('div');
    headerTitle.textContent = 'Chat with Me! (Beta)';
    chatHeader.appendChild(headerTitle);

    // Add the "in progress" subtitle
    const headerSubtitle = document.createElement('div');
    // headerSubtitle.textContent = 'Note: Responses may vary or be inaccurate';
    headerSubtitle.style.fontSize = '12px';
    headerSubtitle.style.fontWeight = 'bold';
    headerSubtitle.style.color = 'red';
    headerSubtitle.style.marginTop = '1px'; // Add spacing between title and subtitle
    chatHeader.appendChild(headerSubtitle);

   chatContainer.appendChild(chatHeader);
 
   // Set up the chat container layout
   chatContainer.style.flexDirection = 'column';
   chatContainer.style.zIndex = '1000';

  // Create a div for chat messages
  const chatMessages = document.createElement('div');
  chatMessages.style.flex = '1';
  chatMessages.style.padding = '8px';
  chatMessages.style.overflowY = 'auto';
  chatMessages.style.fontSize = '14px';
  chatMessages.style.border = '1px solid #ddd';
  chatMessages.style.backgroundColor = '#fff';
  chatMessages.style.display = 'flex';
  chatMessages.style.flexDirection = 'column'; // Stack messages vertically
  chatMessages.style.gap = '10px'; // Space between messages

  chatContainer.appendChild(chatMessages);

  // Add a welcome message
  const welcomeMessageWrapper = document.createElement('div');
  welcomeMessageWrapper.classList.add('message-wrapper', 'bot'); // Use bot styles for alignment
  
  const welcomeMessage = document.createElement('div');
  welcomeMessage.classList.add('message', 'bot'); // Apply bot bubble styling
  welcomeMessage.innerText = `Welcome! I am Akshaj Alva. What do you want to know about me? \nWait for a few minutes to recieve the first response.`;
  
  welcomeMessageWrapper.appendChild(welcomeMessage); // Add the message bubble to the wrapper
  chatMessages.appendChild(welcomeMessageWrapper); // Append the wrapper to the chat container
  

  // Input container
  const inputContainer = document.createElement('div');
  inputContainer.style.display = 'flex';
  inputContainer.style.borderTop = '1px solid #ddd';
  inputContainer.style.padding = '8px';
  inputContainer.style.fontSize = '14px';
  inputContainer.style.backgroundColor = '#fff';
  chatContainer.appendChild(inputContainer);

  // Input field for user input
  const userInput = document.createElement('input');
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('placeholder', 'Type your Question');
  userInput.style.flex = '1';
  userInput.style.padding = '8px';
  userInput.style.border = '1px solid #ccc';
  userInput.style.borderRadius = '5px';
  userInput.style.boxSizing = 'border-box';
  userInput.style.fontSize = '14px';
  inputContainer.appendChild(userInput);

  //Send button

  const sendButton = document.createElement('sendbutton');
  sendButton.innerHTML = '<img src="images/sendicon.png" alt="Send" style="width: 25px; height: 25px;"/>'; // Add your own send icon
  sendButton.style.backgroundColor = 'transparent';
  sendButton.style.border = 'none';
  sendButton.style.cursor = 'pointer';
  sendButton.style.marginLeft = '10px';
  sendButton.setAttribute('aria-label', 'Send message');
  
  sendButton.style.display = 'flex';
  sendButton.style.alignItems = 'center'; // Vertically center the content inside the button
  sendButton.style.justifyContent = 'center'; // Horizontally center the content inside the button

  // Append the send button next to the input field
  userInput.parentElement.appendChild(sendButton);

  // Event listener for the send button click
  sendButton.addEventListener('click', async function () {
    const userMessage = userInput.value.trim();
    if (userMessage) {
      addMessage('You', userMessage);
      userInput.value = ''; // Clear the input field
      const botResponse = await fetchBotResponse(userMessage); // Call the backend API
      addMessage('Bot', botResponse);
    }
  });

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
    // Create the message wrapper
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');
    messageWrapper.classList.add(sender === 'You' ? 'user' : 'bot');
  
    // Create the message bubble
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'You' ? 'user' : 'bot');
    messageDiv.innerText = message;
  
    // Append message to the wrapper
    messageWrapper.appendChild(messageDiv);
  
    // Append wrapper to the chat messages container
    chatMessages.appendChild(messageWrapper);
  
    // Scroll to the start of the newly added message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  


  // Function to fetch dynamic bot response from backend
  async function fetchBotResponse(userMessage) {
    try {
      const response = await fetch('https://portfolio-chatbot-1os3.onrender.com/chat', { // Replace '/api/chat' with your API endpoint
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
