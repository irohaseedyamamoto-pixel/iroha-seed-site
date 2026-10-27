import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContactPage from './ContactPage.tsx';
import RenewPage from './RenewPage.tsx';
import './index.css';

/*
 * 2026-10-27 新サイトへ切り替え。トップを新サイト（RenewPage）にする。
 * 旧サイトのページ（App / CompanyPage / ServicePage）は使わなくなったが、ファイルはいったん残している。
 * 古いURLを開いた人が旧デザインを目にしないよう、/company・/service・確認用の /renew はトップへ移す。
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RenewPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/company" element={<Navigate to="/" replace />} />
        <Route path="/service" element={<Navigate to="/" replace />} />
        <Route path="/renew" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
