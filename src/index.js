import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import {jarvisApi} from "./Redux/ApiProvider/jarvisAPI";
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {addStore, store, persistor} from "./Redux/Store/Store";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        {/*<ApiProvider api={jarvisApi} >*/}
          <App />
        {/*</ApiProvider>*/}
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
