import React, { useEffect, useState } from 'react';
import './App.css'
import calendarSvg from './assets/svg/calendar.svg';
import copySvg from './assets/svg/clone.svg';
import fbSvg from './assets/svg/facebook.svg';
import instSvg from './assets/svg/instagram.svg';
import mailSvg from './assets/svg/mail.svg';
import mapSvg from './assets/svg/map.svg';
import phoneSvg from './assets/svg/phone.svg';
import downSvg from './assets/svg/sort-down.svg';

function Footer() {

    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = (e) => {
        const infoItem = e.target.closest(".info-item");

        const text = infoItem.querySelector(".info-text").innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Помилка копіювання: ", err);
            });
    };

    const schedule = [
        { day: "Понеділок", hours: "08:00 - 21:00" },
        { day: "Вівторок", hours: "08:00 - 21:00" },
        { day: "Середа", hours: "08:00 - 21:00" },
        { day: "Четвер", hours: "08:00 - 21:00" },
        { day: "Пʼятниця", hours: "08:00 - 21:00" },
        { day: "Субота", hours: "09:00 - 22:00" },
        { day: "Неділя", hours: "10:00 - 22:00" },
    ];

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const todayIndex = new Date().getDay();
    const currentDay = todayIndex === 0 ? 6 : todayIndex - 1;

    const togglePopup = () => setIsPopupVisible(!isPopupVisible);

    return(
        <footer className="footer-homepage">
            <div className="information">
                <div className='info-item'>
                    <img className='elem-svg' src={mapSvg} />
                    <div className='info'>
                        <div className='info-title'>Адреса:</div>
                        <div className='info-text'>вулиця Хрещатик, 38, Київ, 01001</div>
                    </div>
                    <img className='copy-svg' src={copySvg} onClick={handleCopy} />
                    {isCopied && (
                        <div className="copy-notification">
                            ДАНІ СКОПІЙОВАНО
                        </div>
                    )}
                </div>
                <div className='info-item'>
                    <img className='elem-svg' src={phoneSvg} />
                    <div className='info'>
                        <div className='info-title'>Телефон:</div>
                        <div className='info-text'>+380123456789</div>
                    </div>
                    <img className='copy-svg' src={copySvg} onClick={handleCopy} />
                    {isCopied && (
                        <div className="copy-notification">
                            ДАНІ СКОПІЙОВАНО
                        </div>
                    )}
                </div>
                <div className='info-item'>
                    <img className='elem-svg' src={mailSvg} />
                    <div className='info'>
                        <div className='info-title'>Ел. пошта:</div>
                        <div className='info-text'>restaurant@gmail.com</div>
                    </div>
                    <img className='copy-svg' src={copySvg} onClick={handleCopy} />
                    {isCopied && (
                        <div className="copy-notification">
                            ДАНІ СКОПІЙОВАНО
                        </div>
                    )}
                </div>
                <div className='info-item'>
                    <img className='elem-svg' src={calendarSvg} />
                    <div className='info'>
                        <div className='info-title'>Робочий час:</div>
                        <div className='info-text'>{schedule[currentDay].hours}</div>
                    </div>
                    <button className='schedule' onClick={togglePopup}>
                        Розклад<img className='shedule-svg' src={downSvg} />
                    </button>

                    {isPopupVisible && (
                        <div className="popup">
                            {schedule.map((item, index) => (
                                <div
                                    key={index}
                                    className={`popup-item ${
                                        index === currentDay ? "highlight" : ""
                                    }`}
                                >
                                    <span>{item.day}</span>
                                    <span>{item.hours}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='social-media'>
                    <div className='sm-text'>Наші соцмережі</div>
                </div>
                <div className='sm-svg'>
                        <a href='https://www.instagram.com/' target="_blank" className='sm-link'>
                            <img className='elem-svg' src={instSvg} />
                        </a>
                        <a href='https://www.facebook.com/?locale=uk_UA' target="_blank" className='sm-link'>
                            <img className='elem-svg' src={fbSvg} />
                        </a>
                </div>
            </div>
            
            <div className='information-right'>
                <div className='social-media'>
                    <div className='sm-text'>Розташування</div>
                </div>
                <iframe className='map'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1270.382450485187!2d30.519173338912626!3d50.445479600962194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5660c5dbb9%3A0xa86885b4f9b203be!2z0LLRg9C70LjRhtGPINCl0YDQtdGJ0LDRgtC40LosIDM4LCDQmtC40ZfQsiwgMDEwMDE!5e0!3m2!1suk!2sua!4v1740061611293!5m2!1suk!2sua"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>               
            </div>
        </footer>
        
    )
}

export default Footer;