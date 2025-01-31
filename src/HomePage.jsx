import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css'
import './App.css'
import restaurantImage from './assets/restaurant.jpg'
import rightSvg from './assets/svg/right.svg'
import Footer from "./Footer"

function HomePage() {

    const navigate = useNavigate();
    const navigateToMenu = () => {
        navigate('/menu');
    };

    const navigateToContacts = () => {
        navigate('/contacts');
    };

    const navigateToOrder = () => {
        navigate('/makeorder');
    };

    const navigateToFeedback = () => {
        navigate('/feedback');
    };

    return(
        <div className='homepage'>
            <main className='main-homepage'>
                <section className="img-section">
                    <div className='title-section'>
                        <h1 className="rest-title">REST</h1>
                    </div>
                    <div className="image-container">
                        <img className="rest-image" src={restaurantImage} alt="Restaurant Photo" loading="lazy" />
                    </div>
                </section>

                <section className="categories">

                    <nav className="category-list">
                        <button className="category" onClick={navigateToMenu}>МЕНЮ
                            <img className='right-arrow' src={rightSvg} />
                        </button>
                        <button className="category" onClick={navigateToOrder}>ЗРОБИТИ ЗАМОВЛЕННЯ
                            <img className='right-arrow' src={rightSvg} />
                        </button>
                        <button className="category" onClick={navigateToContacts}>КОНТАКТИ
                            <img className='right-arrow' src={rightSvg} />
                        </button>
                        <button className="category" onClick={navigateToFeedback}>НАДІСЛАТИ ВІДГУК
                            <img className='right-arrow' src={rightSvg} />
                        </button>
                    </nav>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default HomePage;