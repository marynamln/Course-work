import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import ContactsPage from './ContactsPage';
import MakeOrderPage from './MakeOrderPage';
import FeedbackPage from './FeedbackPage';
import ConfirmOrderPage from './ConfirmOrderPage';
import ConfirmDeliveryPage from './ConfirmDeliveryPage';
import FinalOrderPage from './FinalOrderPage';
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
      <Route path="/confirm-order" element={<ConfirmOrderPage/>} />
      <Route path="/confirm-order/confirm-delivery" element={<ConfirmDeliveryPage/>} />
      <Route path='/confirm-order/confirm-delivery/your-order' element={<FinalOrderPage/>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>   
  )
}

export default App;