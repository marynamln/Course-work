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

    return (
        <div className='page'>
            <header className='header'>
                <button className="icon" onClick={navigateHome}>
                    <img className='left-svg' src={leftSvg} />
                </button>
                <h2 className='page-title'>НАДІСЛАТИ ВІДГУК</h2>
            </header>

            <Footer />
        </div>
    )
}

export default FeedbackPage;