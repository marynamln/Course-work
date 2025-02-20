import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import leftSvg from './assets/svg/left.svg';
import Footer from "./Footer";
import clock from './assets/svg/alarm-clock.svg'
import locationSvg from './assets/svg/location.svg'
import user from './assets/svg/user.svg'
import delSvg from './assets/svg/person-walking.svg'

function FinalOrderPage() {

    const location = useLocation();
    const { price, orderItems, name, tel, deliveryTime, deliveryType, address, building, entrance, flat } = location.state;

    const navigate = useNavigate();
    const navigateHome = () => {
        localStorage.clear();
        navigate('/home');
    };

    const custName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return (
        <div className='page'>
            <header className='header'>
                <button className="icon" onClick={navigateHome} >
                    <img className='left-svg' src={leftSvg} />
                </button>
                <h2 className='page-title'>Ваше замовлення</h2>
            </header>

            <main className='main'>
                <div className="order-items-delivery">
                    {Object.entries(orderItems).map(([itemId, { quantity, item }]) => (
                        <MenuItem key={itemId} item={item} quantity={quantity} />
                    ))}
                </div>

                <div className="order-total-delivery">
                    <div className='all-price-text-delivery'>Сума замовлення:</div>
                    <div className='all-price-number-delivery'>{price} UAH</div>
                </div>

                <div className='customer-contacts'>
                    <div className='customer-contacts-title'>Дані замовлення</div>

                    <div className='info-item'>
                        <img className='final-elem-svg' src={user} />
                        <div className='customer-contacts-group'>
                            <div className='group-title'>Особисті дані</div>
                            <div className='group-info'>{custName}, {tel}</div>
                        </div>
                    </div>

                    <div className='info-item'>
                        <img className='final-elem-svg' src={delSvg} />
                        <div className='customer-contacts-group'>
                            <div className='group-title'>Спосіб отримання замовлення</div>
                            <div className='group-info'>{deliveryType === 'pickup' ? "З собою" : "Доставка"}</div>
                        </div>
                    </div>

                    {deliveryType === 'delivery' &&
                        <div className='info-item'>
                            <img className='final-elem-svg' src={locationSvg} />
                            <div className='customer-contacts-group'>
                                <div className='group-title'>Адреса</div>
                                <div className='group-info'>{address}, {building}
                                    {entrance && `, під'їзд ${entrance}`}
                                    {flat && `, квартира ${flat}`}
                                </div>
                            </div>
                        </div>
                    }

                    <div className='info-item'>
                        <img className='final-elem-svg' src={clock} />
                        <div className='customer-contacts-group'>
                            <div className='group-title'>Час отримання замовлення</div>
                            <div className='group-info'>{deliveryTime === 'asap' ? "Якнайшвидше" : deliveryTime}</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />            
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

export default FinalOrderPage;