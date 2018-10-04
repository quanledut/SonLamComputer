import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './app/stylesheets/index.css';
import App from './app/components';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import store from './app/stores'

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
