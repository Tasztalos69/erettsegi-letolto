import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import App from "./App";
import Adatvedelem from "./Adatvedelem";
import useForceUpdate from "./utils/forceUpdate";

import "./index.css";

const Wrapper = () => {
  const [collection, setCollection] = useState(true);

  const [num, update] = useForceUpdate();

  useEffect(() => {
    setCollection(!localStorage.getItem("disable-data-collection"));
  }, [num]);

  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen dark:bg-gray-900 dark:text-gray-50">
      <Helmet>
        {collection && (
          <script
            async
            data-website-id="e5accffe-7ac1-4ef1-8fd5-e4d8aeea4950"
            src="https://analytics.wanter.dev/script.js"
          />
        )}
      </Helmet>
      <Router>
        <Routes>
          <Route
            path="/adatvedelem"
            element={<Adatvedelem update={update} />}
          />
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </div>
  );
};

const container = document.querySelector("#root");

const root = createRoot(container!);

root.render(
  <StrictMode>
    <Wrapper />
  </StrictMode>
);
