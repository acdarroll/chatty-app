// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('react-root');
const root = createRoot(rootElement);

root.render(<App />);
