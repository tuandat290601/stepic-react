import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Game, GameDetail, Payment, Error, Event } from "./pages";

import { store } from './store';
import { Provider } from "react-redux";
import { Navbar, ScrollButton } from "./components";

import Footer from "./components/Footer/Footer";
import useViewport from "./customhooks/useViewport";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";



function App() {
  const viewport = useViewport()
  const isTablet = viewport.width < 992
  return <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        {isTablet ? <MobileNavbar /> : <Navbar />}
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/event" element={<Event />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ScrollButton />
        <Footer />
      </BrowserRouter>
    </Provider>
  </div>;
}

export default App;
