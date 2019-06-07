import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import App from '~/App';

// Hot module replacement if in production
const AppContainer = !window.PRODUCTION ? hot(module)(App) : App;

// Create app container
const appElement = document.createElement('div');
document.body.appendChild(appElement);

// Render App with hot module replacement
ReactDOM.render(<AppContainer />, appElement);
