import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import leftSvg from './assets/svg/left.svg';
import Footer from "./Footer";

function FeedbackPage () {

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/home');
    };

    const [dishRating, setDishRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);
    const [comment, setComment] = useState('');

    const navigateFeedback = () => {
        navigate('/your-feedback', { 
            state: { 
                dishRating,
                serviceRating,
                comment
            }
        });
    };

    useEffect(() => {
        handleStarClick("star-dish", setDishRating);
        handleStarClick("star-service", setServiceRating);
    }, []);

    function handleStarClick(starClass, setRating) {
        const stars = document.querySelectorAll(`.${starClass}`);

        stars.forEach(star => {
            star.addEventListener("click", () => {
                const value = parseInt(star.getAttribute("data-value"));
                setRating(value);

                stars.forEach(s => {
                    s.classList.toggle("active", parseInt(s.getAttribute("data-value")) <= value);
                });
            });
        });
    }

    return (
        <div className='page'>
            <header className='header' id='long'>
                <button className="icon" onClick={navigateHome}>
                    <img className='left-svg' src={leftSvg} />
                </button>
                <h2 className='page-title-long'>НАДІСЛАТИ ВІДГУК</h2>
            </header>

            <main className='page'>
                <div className='feedback-title'>Оцініть нас!</div>

                <div className='stars-section'>
                    <div className='stars-title'>Страви</div>
                    <div className="stars">
                        <span className="star-dish" data-value="1">★</span>
                        <span className="star-dish" data-value="2">★</span>
                        <span className="star-dish" data-value="3">★</span>
                        <span className="star-dish" data-value="4">★</span>
                        <span className="star-dish" data-value="5">★</span>
                    </div>
                </div>

                <div className='stars-section'>
                    <div className='stars-title'>Обслуговування</div>
                    <div className="stars">
                        <span className="star-service" data-value="1">★</span>
                        <span className="star-service" data-value="2">★</span>
                        <span className="star-service" data-value="3">★</span>
                        <span className="star-service" data-value="4">★</span>
                        <span className="star-service" data-value="5">★</span>
                    </div>
                </div>

                <div className='hint'>Натисніть на зірку</div>

                <div className='feedback-input-section'>
                    <textarea className='feedback-textarea' type='text' rows="3" placeholder="Коментар"
                    value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <div className='feedback-input-title'>Залиште ваші контакти</div>
                    <input className='feedback-input' type='tel' placeholder="Телефон"/>
                    <input className='feedback-input' type='email' placeholder="Ел. адреса"/>
                    <input className='feedback-input' type='text' placeholder="Ваше ім'я"/>

                    <button 
                        className='feedback-button'
                        disabled={dishRating === 0 || serviceRating === 0}
                        onClick={navigateFeedback}
                    >
                        {dishRating === 0 || serviceRating === 0 ? 
                            "Натисніть на зірочку, щоб оцінити" : 
                            "Надіслати відгук"}
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default FeedbackPage;