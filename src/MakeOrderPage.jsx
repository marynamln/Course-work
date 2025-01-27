import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MenuPage.css'
import './styles/MakeOrderPage.css'
import searchSvg from './assets/svg/search.svg'
import leftSvg from './assets/svg/left.svg';
import menuData from './menu.json';
import upSvg from './assets/svg/chevron-up.svg';
import closeSvg from './assets/svg/xmark.svg';
import Footer from "./Footer";
import Order from './Order';

function MakeOrderPage() {

    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/home');
    };

    const [activeCategory, setActiveCategory] = useState("");

    const scrollToCategory = (category) => {
        const element = document.getElementById(`category-${category}`);
        if (element) {
            const offset = document.querySelector(".menu-category-list").offsetHeight;
            const topPosition = element.getBoundingClientRect().top + window.pageYOffset - offset + 5;
    
            window.scrollTo({
                top: topPosition,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = document.querySelector(".menu-category-list").offsetHeight || 0;
    
            let activeCategory = null;
            Object.keys(menuData).forEach((category) => {
                const section = document.getElementById(`category-${category}`);
                if (section) {
                    const sectionTop = section.getBoundingClientRect().top - offset;
                    if (sectionTop <= 0) {
                        activeCategory = category;
                    }
                }
            });
    
            if (activeCategory) {
                setActiveCategory(activeCategory);
                scrollMenuToActiveCategory(activeCategory);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [menuData]);    

    const scrollMenuToActiveCategory = (category) => {
        const activeButton = document.querySelector(`[data-category="${category}"]`);
        const menuList = document.querySelector(".menu-category-list");
    
        if (activeButton && menuList) {
            const buttonRect = activeButton.getBoundingClientRect();
            const menuRect = menuList.getBoundingClientRect();
    
            if (buttonRect.left < menuRect.left || buttonRect.right > menuRect.right) {
                menuList.scrollTo({
                    left: activeButton.offsetLeft - menuList.offsetWidth / 2 + activeButton.offsetWidth / 2,
                    behavior: "smooth",
                });
            }
        }
    };

    const [selectedItem, setSelectedItem] = useState(null); 
    const [isDialogOpen, setIsDialogOpen] = useState(false); 

    const openDialog = (item) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedItem(null);
        setIsDialogOpen(false);
    };

    const [isSearchActive, setIsSearchActive] = useState(false);
    
    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleCloseSearch = () => {
        setIsSearchActive(false);
        setSearchText("");
    };

    const [searchText, setSearchText] = useState("");

    const handleInputChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const clearInput = () => {
        setSearchText("");
    };

    const categories = Object.keys(menuData);
    const allItems = Object.entries(menuData).flatMap(([category, items]) => items);

    const filteredItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchText)
    );

    const [totalAmount, setTotalAmount] = useState(0);

    const updateTotalAmount = (amount) => {
        setTotalAmount((prev) => prev + amount);
    };

    const [orderItems, setOrderItems] = useState({});

    const updateOrderItems = (itemId, quantity, item) => {
        setOrderItems(prev => {
        if (quantity === 0) {
            const { [itemId]: removed, ...rest } = prev;
            return rest;
        }
        return {
            ...prev,
            [itemId]: {
            quantity,
            item
            }
        };
        });
    };

    return(
        <div className='page'>
            
            <header className={`header ${isSearchActive ? "header-search" : ""}`}>
                {!isSearchActive ? (
                    <>
                    <button className="icon" onClick={navigateHome}>
                        <img className="left-svg" src={leftSvg} alt="Back" />
                    </button>
                    <h2 className="page-title">ЗАМОВЛЕННЯ</h2>
                    <button className="icon" onClick={handleSearchClick}>
                        <img className="search-svg" src={searchSvg} alt="Search" />
                    </button>
                    </>
                ) : (
                    <div className="search-container">
                        <button className="icon" onClick={handleCloseSearch}>
                            <img className="left-svg" src={leftSvg} alt="Back" />
                        </button>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Пошук"
                            value={searchText}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        <button className="icon" onClick={clearInput}>
                            <img className="search-delete-svg" src={closeSvg} alt="Close" />
                        </button>
                    </div>
                )}
            </header>

            <main className='main'>
                
            {searchText ? (
                    <>
                    {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <MenuItem key={index} item={item} openDialog={openDialog} 
                        updateTotalAmount={updateTotalAmount} totalAmount={totalAmount}
                        updateOrderItems={updateOrderItems} orderItems={orderItems}/>
                    ))
                    ) : (
                        <div className='nothing-search'>Нічого не знайдено</div>
                    )}
                    </>
                ) : (
                    <>
                    <nav className="menu-category-list">
                        {categories.map((category) => (
                            <button
                                key={category}
                                data-category={category}
                                className={`menu-category ${activeCategory === category ? "active" : ""}`}
                                onClick={() => scrollToCategory(category)}
                            >
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </nav>

                    {Object.entries(menuData).map(([category, items]) => (
                        <section key={category} id={`category-${category}`} className="menu-category-section">
                            <h2 className="menu-category-title">{category.toUpperCase()}</h2>
                            <div className="menu-items">
                            {items.map((item, index) => (
                                <MenuItem key={index} item={item} openDialog={openDialog} 
                                updateTotalAmount={updateTotalAmount} totalAmount={totalAmount} 
                                updateOrderItems={updateOrderItems} orderItems={orderItems}/>
                            ))}
                            </div>
                        </section>
                    ))}
                    </>
                )}

                <div className='up'>
                    <button className='back-button' 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img className='up-svg' src={upSvg} alt='up'/>
                        <div className='up-text'>Вгору</div>
                    </button>
                </div>
            </main>

            <Footer />

            {isDialogOpen && (
            <>
            <div className="dialog-overlay" onClick={closeDialog}></div>
            <dialog className='popup-menu-item' open>
                <div className='close-button-section'>
                    <img className='close-svg' src={closeSvg} alt="Close" onClick={closeDialog}/>
                </div>
                <div className='dialog-menu-item'>
                    <img className='dialog-item-photo' src={selectedItem?.image} alt={selectedItem?.name} />
                    <h3 className="item-name">{selectedItem?.name}</h3>
                    <h3 className="item-price">{selectedItem?.price} UAH</h3>
                    <p className="item-description-text">{selectedItem?.description}</p>
                    <p className="item-weight">{selectedItem?.weight}</p>
                </div>
            </dialog>
            </>
            )}
        </div>

    )
}

function MenuItem({ item, openDialog, updateTotalAmount, totalAmount, updateOrderItems, orderItems }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = item.description.length > 40;

    return (
        <div className="menu-item" onClick={() => openDialog(item)}>
            <div className="item-description">
                <h3 className="item-name">{item.name}</h3>
                <h3 className="item-price">{item.price} UAH</h3>
                <p className="item-description-text">
                    {isExpanded || !isLongText ? 
                    item.description : `${item.description.slice(0, 40)} `}

                    {isLongText && !isExpanded && (
                        <button
                            className="toggle-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                        >
                            ..більше
                        </button>
                    )}
                </p>

                <p className="item-weight">{item.weight}</p>
            </div>
            <div className="item-photo">
                <img
                    className="photo"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                />
                <Order item={item} updateTotalAmount={updateTotalAmount} totalAmount={totalAmount}
                updateOrderItems={updateOrderItems} orderItems={orderItems}  />
            </div>
        </div>
    );
};

export default MakeOrderPage;