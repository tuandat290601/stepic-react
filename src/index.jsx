import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Game, GameDetail, Payment, Error } from "./pages";

import { store } from './store';
import { Provider } from "react-redux";
import { Navbar, ScrollButton } from "./components";

import { useSelector } from "react-redux/es/exports";
import Footer from "./components/Footer/Footer";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {/* <Footer/> */}
        <ScrollButton />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
