import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import ContactsPage from './ContactsPage';
import MakeOrderPage from './MakeOrderPage';
import FeedbackPage from './FeedbackPage';
import SearchPage from './SearchPage';
import './styles/HomePage.css'
import './styles/MenuPage.css'

function App() {

  return (
    <Routes>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/menu" element={<MenuPage/>} />
      <Route path="/makeorder" element={<MakeOrderPage/>} />
      <Route path="/contacts" element={<ContactsPage/>} />
      <Route path="/feedback" element={<FeedbackPage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default App;