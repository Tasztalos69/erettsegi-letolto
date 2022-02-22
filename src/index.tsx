import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adatvedelem from "./Adatvedelem";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adatvedelem" element={<Adatvedelem />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
