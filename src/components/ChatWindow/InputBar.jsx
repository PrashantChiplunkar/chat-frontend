import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/InputBar.css';

// InputBar component definition
const InputBar = ({ onSendMessage }) => {
  // State to keep track of the input field value
  const [message, setMessage] = useState('');

  // Function to handle input field changes
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to handle send button click
  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input field after sending the message
    }
  };

  // Function to handle Enter key press in input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="input-bar">
      <input
        id="inputField"
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button id="sendButton" onClick={handleSendClick}>
        send 
      </button>
    </div>
  );
};

// PropTypes for the InputBar component
InputBar.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default InputBar;