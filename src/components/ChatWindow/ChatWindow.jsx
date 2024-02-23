import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import InputBar from "./InputBar";
import "../../styles/ChatWindow.css";
import { useParams } from "react-router-dom";

const ChatWindow = () => {
  const { mobile } = useParams();
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);
  let ws = useRef(null);
  const mapping = {
    9029776020: 8850255428,
    8850255428: 9029776020,
  };

  useEffect(() => {
    websocket();

    // return () => {
    //   ws.current.close();
    // };
  }, []);

  const websocket = () => {
    ws.current = new WebSocket(`ws://localhost:8090/v1.0/chat/${mobile}`);

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onmessage = (event) => {
      console.log(event.data);
      const message = event.data;
      // const message = JSON.parse(event.data);
      // console.log('Message received:', message);
      // Use a functional update to ensure we have the latest state
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          text: message,
          sender: "other",
          isOwnMessage: false,
        },
      ]);
      scrollToBottom();
    };
    return ws.current;
  };

  const sendMessage = (text) => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now(),
        text,
        sender: "user",
        isOwnMessage: true,
      };
      setMessages((currentMessages) => [...currentMessages, newMessage]);
      scrollToBottom();

      if (!ws.current || ws.current.readyState === WebSocket.OPEN) {
        ws.current = websocket(); // Assuming this is your function to initialize a WebSocket connection.
      }
      console.log("event sent :", { text, to: mapping[mobile] });
      ws.current.send(JSON.stringify({ text, to: mapping[mobile] }));
      // if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      //     console.log("event sent :", {text,to: mapping[mobile]});
      //     ws.current.send(JSON.stringify({text,to: mapping[mobile]}));
      // } else {
      //     console.error("WebSocket is not open. Current state:", ws.current ? ws.current.readyState : 'WebSocket instance does not exist');
      //     // Optionally, you can try to reconnect here if the WebSocket is not in the OPEN state.
      //     // This depends on your application's logic and how you handle WebSocket connections.
      //     // For example:
      //     if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      //         websocket(); // Assuming this is your function to initialize a WebSocket connection.
      //     }
      //     console.log("event sent :", {text,to: mapping[mobile]});
      //     ws.current.send(JSON.stringify({text,to: mapping[mobile]}));
      // }
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  return (
    <div id="chatWindowContainer" className="chat-window">
      <MessageList id="messageList" messages={messages} ref={messageListRef} />
      <InputBar id="messageInput" onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
