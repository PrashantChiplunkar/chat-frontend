import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Message.css'; // Assuming a CSS file for styling the Message component

// Message component represents a single message in the chat window
const Message = ({ text, isOwnMessage }) => {
  // Assign a different className based on whether the message is sent by the user or others
  const messageClass = isOwnMessage ? 'messageItem--outgoing' : 'messageItem--incoming';

  return (
    <div className={messageClass} id="messageItem">
      <p>{text}</p>
    </div>
  );
};

// Define the prop types for the Message component
Message.propTypes = {
  text: PropTypes.string.isRequired,
  isOwnMessage: PropTypes.bool.isRequired
};

export default Message;