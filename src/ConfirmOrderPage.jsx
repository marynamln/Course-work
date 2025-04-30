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

    // const [orderItems, setOrderItems] = useState(initialOrderItems);
    // const [totalPrice, setTotalPrice] = useState(totalAmount);

    const [totalPrice, setTotalPrice] = useState(() => {
        const savedtotalAmount = localStorage.getItem("totalAmount");
        return savedtotalAmount ? JSON.parse(savedtotalAmount) : totalAmount;
    });

    const [orderItems, setOrderItems] = useState(() => {
        const savedOrderItems = localStorage.getItem("orderItems");
        return savedOrderItems ? JSON.parse(savedOrderItems) : (state?.orderItems || {});
    });

    useEffect(() => {
        localStorage.setItem("orderItems", JSON.stringify(orderItems));
    }, [orderItems]);

    useEffect(() => {
        localStorage.setItem("totalAmount", totalPrice);
    }, [totalPrice]);

    const removeItem = (itemId) => {
        const itemToRemove = orderItems[itemId];
        if (itemToRemove) {
            setOrderItems((prevItems) => {
                const updatedItems = { ...prevItems };
                delete updatedItems[itemId];
                localStorage.removeItem(`quantity-${itemId}`);
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
                localStorage.setItem(`quantity-${itemId}`, JSON.stringify(newQuantity));
            } else {
                delete updatedOrderItems[itemId];
                localStorage.removeItem(`quantity-${itemId}`);
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

    const [commentForOrder, setComment] = useState('');
    useEffect(() => {
        const savedComment = localStorage.getItem("commentForOrder");
        if (savedComment) {
            setComment(savedComment);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("commentForOrder", commentForOrder);
    }, [commentForOrder]);

    return (
        <div className='page'>
            <header className='header' id='long'>
                <button className="icon" onClick={navigateToOrder} >
                    <img className='left-svg' src={leftSvg} />
                </button>
                
                <div className='main-title'>
                    <h3 className='page-title-long'>Перевірте замовлення</h3>
                </div>
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
                    <textarea className='comment' rows="5" placeholder="Введіть тут ваш коментар" 
                    value={commentForOrder} onChange={(e) => setComment(e.target.value)}></textarea>
                </div>

                <button className="next-button" onClick={navigateConfirmDelivery}>ДАЛІ</button>
                
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

    // const [number, setQuantity] = useState(quantity);
    const [number, setQuantity] = useState(() => {
        const savedQuantity = localStorage.getItem(`quantity-${item.id}`);
        return savedQuantity ? JSON.parse(savedQuantity) : quantity;
    });

    useEffect(() => {
        localStorage.setItem(`quantity-${item.id}`, JSON.stringify(number));
      }, [number]);

    const handleIncrement = () => {
        const newQuantity = number + 1;
        setQuantity(newQuantity);
        updateItemQuantity(newQuantity);
        setTotalPrice(totalPrice + item.price);
    };

    const handleDecrement = () => {
        const newQuantity = number - 1;
        setQuantity(newQuantity);
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