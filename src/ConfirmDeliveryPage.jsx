import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import leftSvg from './assets/svg/left.svg';
import './styles/ConfirmOrderPage.css';

function ConfirmOrderPage() {

    const location = useLocation();
    const { totalPrice } = location.state;

    const [orderItems, setOrderItems] = useState(() => {
        const savedOrderItems = localStorage.getItem("orderItems");
        return savedOrderItems ? JSON.parse(savedOrderItems) : (state?.orderItems || {});
    });

    const navigate = useNavigate();
    const navigateToConfirmOrder = () => {
        navigate('/confirm-order');
    };

    const [price, setPrice] = useState(totalPrice);

    const [timeOptions, setTimeOptions] = useState([]);

    useEffect(() => {
        const generateTimeOptions = () => {
            const now = new Date();
            const options = [];
            const endHour = 21;

            const startMinutes = now.getMinutes();
            const roundedMinutes = Math.ceil(startMinutes / 30) * 60;
            now.setMinutes(roundedMinutes, 0, 0);

            while (now.getHours() < endHour || (now.getHours() === endHour && now.getMinutes() === 0)) {
                options.push(new Date(now.getTime()));
                now.setMinutes(now.getMinutes() + 30);
            }

            return options.map(time => {
                const hours = time.getHours().toString().padStart(2, '0');
                const minutes = time.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            });
        };

        setTimeOptions(generateTimeOptions());
    }, []);

    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
    const [building, setBuild] = useState('');
    const [entrance, setEntrance] = useState('');
    const [flat, setFlat] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('asap');
    const [deliveryType, setDeliveryType] = useState('pickup');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleTelChange = (e) => {
        setTel(e.target.value);
    };

    const handleTimeChange = (e) => {
        setDeliveryTime(e.target.value);
    };

    const handleTypeChange = (e) => {
        setDeliveryType(e.target.value);
    };

    const handleAdressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleBuildChange = (e) => {
        setBuild(e.target.value);
    };

    const handleEntranceChange = (e) => {
        setEntrance(e.target.value);
    };

    const handleFlatChange = (e) => {
        setFlat(e.target.value);
    };

    const navigateToFinalOrder = () => {
        navigate('/confirm-order/confirm-delivery/your-order', { 
            state: { 
                price,
                orderItems,
                name, 
                tel, 
                deliveryTime, 
                deliveryType,
                address,
                building,
                entrance,
                flat
            }
        });
    };

    return (
        <div className='page'>
            <header className='header' id='long'>
                <button className="icon" onClick={navigateToConfirmOrder} >
                    <img className='left-svg' src={leftSvg} />
                </button>
                
                <div className='main-title'>
                    <h3 className='page-title-long'>Підтвердіть замовлення</h3>
                </div>
            </header>

            <main className='main'>
                <form className='confirm-delivery-categories' id='delivery-form' autoComplete="on">

                    <div className='confirm-delivery-category'>
                        <span className='delivery-category-title'>Спосіб доставки</span>
                        <select name="delivery-type" className='delivery-select'
                        value={deliveryType} onChange={handleTypeChange}>
                            <option value="pickup">З собою</option>
                            <option value="delivery">Доставка</option>
                        </select>
                    </div>

                    <div className='confirm-delivery-category'>
                        <span className='delivery-category-title'>Оберіть час</span>
                        <select name="delivery-time" className='delivery-select'
                        value={deliveryTime} onChange={handleTimeChange}>
                            <option value="asap">Якнайшвидше</option>
                            {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='confirm-delivery-category'>
                        <span className='delivery-category-title'>Ваше ім'я*</span>
                        <input className='delivery-input' type='text' 
                        value={name} onChange={handleNameChange} required autoComplete="given-name"/>
                    </div>

                    <div className='confirm-delivery-category'>
                        <span className='delivery-category-title'>Телефон*</span>
                        <input className='delivery-input' type='tel'
                        value={tel} onChange={handleTelChange}  required autoComplete="tel"/>
                    </div>

                    {deliveryType === 'delivery' &&
                    <>
                        <div className='confirm-delivery-category'>
                            <span className='delivery-category-title'>Вулиця*</span>
                            <input className='delivery-input' type='text'
                            value={address} onChange={handleAdressChange}  required autoComplete="street-address"/>
                        </div>

                        <div className='confirm-delivery-category-row'>
                            <div className='confirm-delivery-category' id='row-category'>
                                <span className='delivery-category-title'>Будинок*</span>
                                <input className='delivery-input' type='number'
                                value={building} onChange={handleBuildChange}  required />
                            </div>

                            <div className='confirm-delivery-category' id='row-category'>
                                <span className='delivery-category-title'>Під'їзд</span>
                                <input className='delivery-input' type='number'
                                value={entrance} onChange={handleEntranceChange} />
                            </div>

                            <div className='confirm-delivery-category' id='row-category'>
                                <span className='delivery-category-title'>Квартира</span>
                                <input className='delivery-input' type='number'
                                value={flat} onChange={handleFlatChange} />
                            </div>
                        </div>
                    </>
                    }

                </form>
                <div className='order-text'>Замовлення:</div>
                <div className="order-items-delivery">
                    {Object.entries(orderItems).map(([itemId, { quantity, item }]) => (
                        <MenuItem key={itemId} item={item} quantity={quantity} />
                    ))}
                </div>
                <div className="order-total-delivery">
                    <div className='all-price-text-delivery'>До оплати:</div>
                    <div className='all-price-number-delivery'>{price} UAH</div>
                </div>

                <button className='confirm-delivery-button' 
                onClick={(e) => {
                    e.preventDefault();
                    const form = document.getElementById('delivery-form');
                    if (form.checkValidity()) {
                        navigateToFinalOrder();
                    } else {
                        form.reportValidity();
                    }
                }}
                >
                    ДАЛІ
                </button>

            </main>

        </div>
    );
};

function MenuItem({ item, quantity }) {

    const [number, setQuantity] = useState(quantity);

    return (
        <div className="menu-item-delivery">
            <div className="item-number-delivery">{number}-x</div>
            <div className='item-name-delivery'>{item.name}</div>
            <div className="item-price-delivery">{item.price*number} UAH</div>
        </div>
    );
};

export default ConfirmOrderPage;