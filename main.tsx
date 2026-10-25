import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ContactPage from './ContactPage.tsx';
import CompanyPage from './CompanyPage.tsx';
import ServicePage from './ServicePage.tsx';
import RenewPage from './RenewPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/service" element={<ServicePage />} />
        {/* 作り直し版の検証用ルート（公開前に整理する） */}
        <Route path="/renew" element={<RenewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
