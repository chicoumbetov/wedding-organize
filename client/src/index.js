import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import reducers from './reducers'

import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)))
// console.log("store:", store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
