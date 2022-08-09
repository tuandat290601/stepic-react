import React from 'react'
import { useState } from 'react';

import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { BsCartFill } from "react-icons/bs"

import "./MobileNavbar.sass"


const MobileNavbar = () => {
    const dispatch = useDispatch()
    const { cartProduct } = useSelector(store => store.product)
    const [isOpen, setIsOpen] = useState(false)
    const [count, setCount] = useState(0)
    return (
        <aside id='mobile-navbar'>
            <div className="mobile-navbar-container">
                <div className="mobile-navbar-header">
                    <Link to="/" className="mobile-logo">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                    <div className="mobile-menu">
                        <div className="mobile-cart-container">
                            <Link to="/payment">
                                <BsCartFill />
                            </Link>
                            <div className="mobile-amount">
                                {cartProduct.length}
                            </div>
                        </div>
                        <button className={isOpen ? "btn menu-toggle rotate-90 is-toggled" : "btn menu-toggle"} onClick={() => setIsOpen(!isOpen)}>
                            <FaBars />
                        </button>
                    </div>
                </div>
                {isOpen ? <div className="mobile-navbar-body">
                    <ul className="mobile-navbar-list">
                        <li className="mobile-navbar-item" onClick={() => { setIsOpen(false) }}>
                            <Link to="/product">Game</Link>
                        </li>
                        <li className="mobile-navbar-item" onClick={() => { setIsOpen(false) }}>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li className="mobile-navbar-item" onClick={() => { setIsOpen(false) }}>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div> : <></>}
            </div>


        </aside>
    )
}

export default MobileNavbar