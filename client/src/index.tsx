import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// import reducers from "./redux/reducers"
// import {applyMiddleware, compose, createStore} from "redux";
// import thunk from "redux-thunk";
import './index.css';
import App from "./App";
import store from "./store/store";

// const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
