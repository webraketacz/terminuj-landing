import React from 'react';
import 'iconify-icon';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CenikPage from './pages/CenikPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cenik" element={<CenikPage />} />
    </Routes>
  );
}
