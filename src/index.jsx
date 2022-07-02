import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Game, GameDetail, Payment } from "./pages";

import { store } from './store';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="login" element = {<Login/>}/>
        <Route path="/" element={<App/>}>
          <Route index element = {<Home/>}/>
        </Route>
        <Route path = "game" element = {<Game/>}>
          <Route path = ":id" element = {<GameDetail/>}/>
        </Route>
        <Route path = "payment" element = {<Payment/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
