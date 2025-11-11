import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinsList from "./pages/CoinList";
import CoinDetails from "./pages/CoinDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoinsList />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </Router>
  );
}
