// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import VisitLayout from './Visit/Layout.jsx'

document.addEventListener('DOMContentLoaded', () => {

  

  // #root → Layout (your existing pages)
  const rootContainers = document.querySelectorAll('#root');
  rootContainers.forEach(container => {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <LanguageProvider>
          <Layout />
        </LanguageProvider>
      </StrictMode>
    );
  });


  const Visitcontainers = document.querySelectorAll('#root-visit');
  Visitcontainers.forEach(container => {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <LanguageProvider>
          <VisitLayout />
        </LanguageProvider>
      </StrictMode>
    );
  });
  const NavbarContainers = document.querySelectorAll('#root-navbar');
  NavbarContainers.forEach(container => {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <LanguageProvider>
          <Navbar />
        </LanguageProvider>
      </StrictMode>
    );
  });
});
