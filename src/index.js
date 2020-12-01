import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { Provider } from "react-redux";
import { mainStore } from "./store";

import 'bootstrap/dist/css/bootstrap.min.css';


const firebaseConfig = {
  apiKey: "AIzaSyC6xm7k73PCO_99fqGWLytclNJWk5Jj-AI",
  authDomain: "test-very-intresting.firebaseapp.com",
  databaseURL: "https://test-very-intresting.firebaseio.com",
  projectId: "test-very-intresting",
  storageBucket: "test-very-intresting.appspot.com",
  messagingSenderId: "308976974515",
  appId: "1:308976974515:web:08feeb6a604d2e8b810ec6"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={mainStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
