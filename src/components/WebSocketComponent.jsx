import React, { useEffect, useState } from 'react';

function WebSocketComponent() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8090/v1.0/chat/8850255428');
    setWs(socket);

    socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
    };

    socket.onopen = () => console.log('WebSocket is open now.');
    socket.onerror = (event) => console.error("WebSocket error observed:", event);

    // return () => {
    //   socket.close();
    // };
  }, []);

  useEffect(() => {
    console.log('Message from server ');
  }, [ws]);

  const sendMessage = () => {
    console.log("inside >>")
    if (ws) {
      ws.send('Hello Server!');
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default WebSocketComponent;
