import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css'; // Assuming global styles are imported here

// Render the App component to the DOM, targeting the root element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);