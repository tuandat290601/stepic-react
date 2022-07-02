import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Game, GameDetail, Payment, Error } from "./pages";

import { store } from './store';
import { Provider } from "react-redux";
import { Navbar } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/game" element = {<Game/>}/>
        <Route path = "/game/:id" element = {<GameDetail/>}/>
        <Route path = "/payment" element = {<Payment/>}/>
        <Route path = "*" element = {<Error/>}/>
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
