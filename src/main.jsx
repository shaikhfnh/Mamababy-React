import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Layout from "./Layout.jsx";
import Navbar from "./components/Navbar.jsx";
import VisitLayout from "./Visit/Layout.jsx";
import Footer from "./components/Footer.jsx";

import { LanguageProvider } from "./context/LanguageContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

function renderReact(selector, Component) {
  const containers = document.querySelectorAll(selector);

  containers.forEach((container) => {
    const root = createRoot(container);

    root.render(
      <StrictMode>
        <LanguageProvider>
          <DataProvider>
            <Component />
          </DataProvider>
        </LanguageProvider>
      </StrictMode>
    );
  });
}

function initReact() {
  renderReact("#root", Layout);
  renderReact("#root-navbar", Navbar);
  renderReact("#root-visit", VisitLayout);
  renderReact("#root-footer", Footer);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReact);
} else {
  initReact();
}