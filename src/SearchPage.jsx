import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css'
import './App.css'
import leftSvg from './assets/svg/left.svg'
import searchSvg from './assets/svg/search.svg'

function SearchPage() {

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
                <h2 className='page-title'>Пошук по меню</h2>
            </header>
            
            <main className='page'>
                
            </main>
        </div>
    );
}

export default SearchPage;