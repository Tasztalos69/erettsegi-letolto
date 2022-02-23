import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from "react-helmet";
import "./index.css";
import App from "./App";
import Adatvedelem from "./Adatvedelem";
import useForceUpdate from "./utils/forceUpdate";

const Wrapper = () => {
  const [collection, setCollection] = useState(true);

  const [num, update] = useForceUpdate();

  useEffect(() => {
    setCollection(!localStorage.getItem("disable-data-collection"));
  }, [num]);

  return (
    <>
      <Helmet>
        {collection && (
          <script
            async
            defer
            data-website-id="e5accffe-7ac1-4ef1-8fd5-e4d8aeea4950"
            src="https://analytics.jelszo.co/umami.js"
          />
        )}
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/adatvedelem"
            element={<Adatvedelem update={update} />}
          />
        </Routes>
      </Router>
      ;
    </>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById("root")
);
