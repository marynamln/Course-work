import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import plusSvg from "./assets/svg/plus.svg";
import minusSvg from "./assets/svg/minus.svg";
import trashSvg from "./assets/svg/trash.svg";
import './styles/MakeOrderPage.css';
import rightSvg from './assets/svg/right copy.svg';

const Order = ({ item, updateTotalAmount, totalAmount, updateOrderItems, orderItems }) => {

  const [quantity, setQuantity] = useState(() => {
    const savedQuantity = localStorage.getItem(`quantity-${item.id}`);
    return savedQuantity ? JSON.parse(savedQuantity) : 0;
  });

  const [isPopupVisible, setIsPopupVisible] = useState(() => {
    const savedPopup = localStorage.getItem("isPopupVisible");
    return savedPopup ? JSON.parse(savedPopup) : false;
  });

  useEffect(() => {
    localStorage.setItem(`quantity-${item.id}`, JSON.stringify(quantity));
    localStorage.setItem("isPopupVisible", JSON.stringify(isPopupVisible));
  }, [quantity, isPopupVisible]);

  useEffect(() => {
    // localStorage.clear();
    const savedTotal = localStorage.getItem("totalAmount");
    if (savedTotal) {
      updateTotalAmount(parseFloat(savedTotal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("totalAmount", totalAmount);
  }, [totalAmount]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateTotalAmount(item.price);
    updateOrderItems(item.id, newQuantity, item);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateTotalAmount(-item.price);
      updateOrderItems(item.id, newQuantity, item);
    } else {
      setQuantity(0);
      setIsPopupVisible(false);
      updateTotalAmount(-item.price);
      updateOrderItems(item.id, 0, item);
    }
  };

  return (
      <>
        {quantity === 0 ? (
          <div className="order-button">
            <button className="make-order" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleIncrement();
                                                    setIsPopupVisible(true);}}>
              + ЗАМОВИТИ
            </button>
          </div>    
        ) : (
          <div className="order-controls">
            <button className="decrement" onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDecrement();}}>
              <img className="minus-order-svg" src={quantity > 1 ? minusSvg : trashSvg} alt="decrement" />
            </button>
            <span className="quantity">{quantity}</span>
            <button className="increment" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleIncrement();}}>
              <img className="plus-order-svg" src={plusSvg} alt="increment" />
            </button>

            {isPopupVisible && (
              <OrderSummaryPopup totalAmount={totalAmount} orderItems={orderItems}/>
            )}
          </div>
          
        )}
      </>
    );
  };

export const OrderSummaryPopup = ({ totalAmount, orderItems }) => {

  const navigate = useNavigate();
  const navigateConfirmOrder = () => {
      navigate('/confirm-order', { 
        state: { 
          orderItems,
          totalAmount 
        } 
      });
  };

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  return (
    <div className="order-summary-popup">
      <span className="total-amount">Сума: {totalAmount} UAH</span>
      <button className="next-button-order" onClick={navigateConfirmOrder}>
        Замовлення
        <img className='right-arrow' src={rightSvg} />
      </button>
    </div>
  );
};

export default Order;