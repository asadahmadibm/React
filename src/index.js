import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import './index.css';
import App from './App';
import './loading.css'
import reportWebVitals from './reportWebVitals';
axios.defaults.baseURL = 'https://localhost:7012'
axios.defaults.headers.post['Contetnt-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1ODQwIiwiVXNlck5hbWUiOiJjb250Yy5haG1hZGl5IiwiVXNlclR5cGUiOiI4IiwicHJvdmluY2VzIjoiIiwiUm9sZXMiOiIiLCJuYmYiOjE2NzQ0NTAwNjcsImV4cCI6MTY3NDQ1MzY2NywiaWF0IjoxNjc0NDUwMDY3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDEyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.5HDAsaWtpYqbYYzQLYnyuH-Sanq5mquPv-q6iqN9iJs";
  config.headers.Authorization = "Bearer " + token;
  return config;
});



axios.interceptors.request.use(function (config) {

  // spinning start to show
  // UPDATE: Add this code to show global loading indicator

  document.body.classList.add('loading-indicator');
  return config
}, function (error) {
  document.body.classList.remove('loading-indicator');
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

  // spinning hide
  // UPDATE: Add this code to hide global loading indicator
  document.body.classList.remove('loading-indicator');

  return response;
}, function (error) {

  document.body.classList.remove('loading-indicator');
  return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
