import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

// MessageList component renders a list of Message components
const MessageList = ({ messages }) => {
  console.log("messages >>", messages);
  return (
    <div id="messageListContainer">
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
};

// PropTypes for MessageList component to ensure correct props are passed
MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      // timestamp: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      isOwnMessage: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default MessageList;