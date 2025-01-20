import React, { useState } from "react";
import plusSvg from "./assets/svg/plus.svg";
import minusSvg from "./assets/svg/minus.svg";
import trashSvg from "./assets/svg/trash.svg";
import './styles/MakeOrderPage.css';
import rightSvg from './assets/svg/right.svg';

const Order = ({ item, updateTotalAmount, totalAmount }) => {
    const [quantity, setQuantity] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
  
    const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
      updateTotalAmount(item.price);
    };
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
        updateTotalAmount(-item.price);
      } else {
        setQuantity(0);
        setIsPopupVisible(false);
        updateTotalAmount(-item.price);
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
            <img className="plus-svg" src={plusSvg} alt="plus" />
            ЗАМОВИТИ
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
            <OrderSummaryPopup totalAmount={totalAmount} />
          )}
        </div>
        
      )}
    </>
  );
};

const OrderSummaryPopup = ({ totalAmount }) => {
  return (
    <div className="order-summary-popup">
      <span className="total-amount">Сума: {totalAmount} UAH</span>
      <button className="next-button-order">
        Замовлення
        <img className='right-arrow' src={rightSvg} />
      </button>
    </div>
  );
};

export default Order;