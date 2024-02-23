import React from 'react';
import ChatWindow from './components/ChatWindow/ChatWindow';
// import WebSocketComponent from './components/WebSocketComponent';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import WebSocketComponent from './WebSocketComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/:mobile" element={<ChatWindow/>} />
          {/* Uncomment and use the line below to add the WebSocketComponent route */}
          {/* <Route path="/websocket" element={<WebSocketComponent />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

