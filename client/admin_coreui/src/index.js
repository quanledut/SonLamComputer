import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import myReducer from './reducers/index';
import {Provider} from 'react-redux';
const store = createStore(myReducer);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
