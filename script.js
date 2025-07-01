function sendMessage() {
  const inputBox = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = inputBox.value.trim();

  if (userMessage === "") return;

  addMessage("You", userMessage, "user-message");

  const botReply = getBotResponse(userMessage.toLowerCase());
  setTimeout(() => {
    addMessage("Bot", botReply, "bot-message");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 400);

  inputBox.value = "";
}

function addMessage(sender, message, className) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
}

function getBotResponse(input) {
  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! How can I help you today?";
  } else if (input.includes("name")) {
    return "I'm a simple chatbot built with JavaScript.";
  } else if (input.includes("how are you")) {
    return "I'm doing great, thank you!";
  } else if (input.includes("help")) {
    return "Sure! Ask me anything.";
  } else if (input.includes("bye")) {
    return "Goodbye! Have a nice day!";
  } else {
    return "Sorry, I didn't understand that.";
  }
}
