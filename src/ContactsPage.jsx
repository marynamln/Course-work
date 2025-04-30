import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';
import './styles/ContactsPage.css';
import './App.css';
import leftSvg from './assets/svg/left.svg';
import phoneSvg from './assets/svg/phone copy.svg';
import Footer from "./Footer";

function ContactsPage() {

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/home');
    };

    return(
        <div className='page'>
            <header className='header'>
                <button className="icon" onClick={navigateHome}>
                    <img className='left-svg' src={leftSvg} />
                </button>
                <h2 className='page-title'>КОНТАКТИ</h2>
            </header>

            <main className='page'>
                <div className='call-section'>
                    <button className='call-button'
                    onClick={() => { window.location.href = "tel:+380123456789"; }}>
                        <img className='call-svg' src={phoneSvg} />
                        <div className='call-text'>Зателефонувати</div>
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ContactsPage;