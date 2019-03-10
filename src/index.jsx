import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import App from '~/App';

// App with hot module replacement wrapper
const HMLApp = hot(module)(App);

const el = document.getElementById('app');
ReactDOM.render(<HMLApp />, el);
