import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import leftSvg from './assets/svg/left.svg';
import Footer from "./Footer";

function FeedbackFinal () {

    const location = useLocation();
    const { dishRating, serviceRating, comment } = location.state;

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/home');
    };

    return (
        <div className='page'>
            <header className='header' id='long'>
                <button className="icon" onClick={navigateHome}>
                    <img className='left-svg' src={leftSvg} />
                </button>
                <div className='main-title'>
                    <h2 className='page-title-long'>НАДІСЛАТИ ВІДГУК</h2>
                </div>
            </header>

            <main className='page-feedback'>
                <div className='feedback-title'>Дякуємо за ваш відгук!</div>

                <div className='stars-section'>
                    <div className='stars-title'>Страви</div>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(value => (
                            <span 
                                key={value} 
                                className={`star-dish ${value <= dishRating ? "active" : ""}`} 
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className='stars-section'>
                    <div className='stars-title'>Обслуговування</div>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(value => (
                            <span 
                                key={value} 
                                className={`star-service ${value <= serviceRating ? "active" : ""}`} 
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className='feedback-comment-section'>
                    {comment && <div className='feedback-comment'>{comment}</div>}
                </div>

            </main>

            <Footer />
        </div>
    )
}

export default FeedbackFinal;