import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import leftSvg from './assets/svg/left.svg';
import minusSvg from "./assets/svg/minus.svg";
import plusSvg from "./assets/svg/plus.svg";
import trashSvg from "./assets/svg/trash.svg";
import cartSvg from './assets/svg/cart.svg';

function ConfirmOrderPage() {

    const location = useLocation();

    const { orderItems: initialOrderItems, totalAmount } = location.state || { orderItems: {}, totalAmount: 0 };

    const [orderItems, setOrderItems] = useState(initialOrderItems);

    const removeItem = (itemId) => {
        const itemToRemove = orderItems[itemId];
        if (itemToRemove) {
            setOrderItems((prevItems) => {
                const updatedItems = { ...prevItems };
                delete updatedItems[itemId];
                return updatedItems;
            });
        }
    };

    const updateItemQuantity = (itemId, newQuantity, itemPrice) => {
        setOrderItems((prevOrderItems) => {
            const updatedOrderItems = { ...prevOrderItems };
            if (newQuantity > 0) {
                updatedOrderItems[itemId] = {
                    ...updatedOrderItems[itemId],
                    quantity: newQuantity,
                };
            } else {
                delete updatedOrderItems[itemId];
            }
            return updatedOrderItems;
        });
    };

    const navigate = useNavigate();
    const navigateToOrder = () => {
        navigate('/makeorder');
    };

    const navigateConfirmDelivery = () => {
        navigate('/confirm-order/confirm-delivery', { 
            state: { 
                totalPrice,
                orderItems
            }
        });
    };

    const [totalPrice, setTotalPrice] = useState(totalAmount); 

    return (
        <div className='page'>
            <header className='header'>
                <button className="icon" onClick={navigateToOrder} >
                    <img className='left-svg' src={leftSvg} />
                </button>
                <h2 className='page-title'>Перевірте замовлення</h2>
            </header>

            <main className='main'>
                {totalPrice > 0 ? 
                <>
                <div className="order-items">
                    {Object.entries(orderItems).map(([itemId, { quantity, item }]) => (
                        <MenuItem key={itemId} item={item} quantity={quantity} 
                        totalPrice={totalPrice} setTotalPrice={setTotalPrice} 
                        updateItemQuantity={(newQuantity) => updateItemQuantity(itemId, newQuantity, item.price)}
                        removeItem={() => removeItem(itemId)} />
                    ))}
                </div>
                
                <div className="order-total">
                    <h2 className='all-price-text'>Всього:</h2>
                    <h2 className='all-price-number'>{totalPrice} UAH</h2>
                </div>

                <div className='comment-section'>
                    <div className='comment-title'>Залиште коментар</div>
                    <textarea className='comment' rows="5" placeholder="Введіть тут ваш коментар"></textarea>
                </div>

                <button className="next-button" onClick={navigateConfirmDelivery}>ДАЛІ</button>
                <div className='bottom'></div>
                </>
                :
                <div className='no-order'>
                    <img className='empty-cart-img' src={cartSvg} alt='empty-cart' />
                    <div className='empty-cart'>Корзина порожня. Ви ще нічого не замовили</div>
                    <button className='exit' onClick={navigateToOrder} >Повернутися до меню</button>
                </div>
                }
            </main>
        </div>
    )
}

function MenuItem({ item, quantity, totalPrice, setTotalPrice, updateItemQuantity }) {

    const [number, setQuantity] = useState(quantity);

    const handleIncrement = () => {
        const newQuantity = number + 1;
        setQuantity(newQuantity);
        updateItemQuantity(newQuantity);
        setTotalPrice(totalPrice + item.price);
    };

    const handleDecrement = () => {
        // if (quantity > 1) {
        //     setQuantity(number - 1);
        //     setTotalPrice(totalPrice - item.price);
        // } else {
        //     setQuantity(0);
        //     setTotalPrice(totalPrice - item.price);
        // }

        const newQuantity = number - 1;
        setQuantity(newQuantity > 0 ? newQuantity : 0);
        updateItemQuantity(newQuantity);
        setTotalPrice(totalPrice - item.price);
    };

    return (
        <div className="menu-item" onClick={() => openDialog(item)}>
            <div className="item-description">
                <h3 className="item-name">{number}-x {item.name}</h3>
                <h3 className="item-price">{item.price} UAH</h3>
                <p className="item-description-text">{item.description}</p>
                <p className="item-weight">{item.weight}</p>
            </div>
            <div className="item-photo">
                <img
                    className="photo"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                />

                <div className="order-controls">
                    <button className="decrement" onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDecrement();}}>
                    <img className="minus-order-svg" src={number > 1 ? minusSvg : trashSvg} alt="decrement" />
                    </button>
                    <span className="quantity">{number}</span>
                    <button className="increment" onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleIncrement();}}>
                    <img className="plus-order-svg" src={plusSvg} alt="increment" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrderPage;