import React, { useState } from 'react';
import axios from 'axios';
import './chatApp.css';
import botImage from './bot.jpg';
import userImage from './user.png';
import chatbot from './chatbot.gif';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to add a new message to the chat
  const addMessage = (message, role) => {
    setMessages(prevMessages => [...prevMessages, { content: message, role }]);
  };

   // Function to send a user message to the bot
  const sendMessage = () => {
    const message = inputMessage.trim();

    if (message !== "") {
      addMessage(message, 'user');
      setInputMessage('');
      setLoading(true);

      axios.post("/chatbot", { message })
        .then(response => {
          addMessage(response.data.Response, 'bot');
        })
        .catch(error => {
          console.error(error);
          addMessage('Failed to connect to the server!', 'bot');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
 
    // Function to toggle chat window visibility
  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };

   
  // Function to close the chat window
  const closeChat = () => {
    setIsChatOpen(false);
  };
  
  return (
    <div className="ED-chat-container">
      <button type="button" className="ED-toggle-chat-btn" onClick={toggleChat}>
      <img src={chatbot} alt="Bot" className="ED-chat-image" />
      </button>
      
      <div className={`ED-chat-box ${isChatOpen ? 'ED-open' : ''}`}>
        <button className="ED-close-btn" onClick={closeChat}>X</button>
        
        <div className="ED-message-container">
          {loading && <div>Loading...</div>}
          {messages.map((msg, index) => (
            <div key={index} className={`ED-message ${msg.role === 'user' ? 'ED-user-message' : 'ED-bot-message'}`}>
              <img src={msg.role === 'user' ? userImage : botImage} alt={msg.role === 'user' ? 'User' : 'Bot'} className="ED-message-image" />
              <div>{msg.content}</div>
            </div>
          ))}
        </div>
        
        <div className="ED-input-group">
          <textarea
            className="ED-form-control"
            rows="2"
            placeholder="Type your message here"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          ></textarea>
          <button type="button" className="ED-send-btn" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;