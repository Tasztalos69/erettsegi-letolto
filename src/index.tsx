import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import App from "./App";
import Adatvedelem from "./pages/Adatvedelem";
import useForceUpdate from "./utils/forceUpdate";

import "./index.css";

const Root = () => {
  const [collection, setCollection] = useState(true);

  const [num, update] = useForceUpdate();

  useEffect(() => {
    setCollection(!localStorage.getItem("disable-data-collection"));
  }, [num]);

  const router = createBrowserRouter([
    {
      path: "/adatvedelem",
      element: <Adatvedelem update={update} />,
    },
    { path: "/:year?/:phase?/:difficulty?/:subject?", element: <App /> },
  ]);

  return (
    <HelmetProvider>
      <Helmet>
        {collection && (
          <script
            async
            data-website-id="e5accffe-7ac1-4ef1-8fd5-e4d8aeea4950"
            src="https://analytics.wanter.dev/script.js"
          />
        )}
      </Helmet>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

const container = document.querySelector("#root");

const root = createRoot(container!);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
