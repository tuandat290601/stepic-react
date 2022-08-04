import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../features/navbar/navbarSlice';
import { removeFromCart, setCartProduct, clearCart } from "../../features/product/productSlice"
import { Link } from 'react-router-dom';
import "./Cart.sass"
import { useState } from 'react';
import { useEffect } from 'react';
import { setCurrentUser } from '../../features/login/loginSlice';
import { MdOutlineDone } from "react-icons/md";

const Cart = () => {
    const dispatch = useDispatch()

    const { cartProduct } = useSelector(store => store.product)
    const { currentUser } = useSelector(store => store.login)

    const [success, setSuccess] = useState(false)

    let navigate = useNavigate()

    const handlePayment = () => {
        if (currentUser === null) {
            dispatch(setCurrentPage("login"))
            navigate('/login')
        }
        else {
            setSuccess(true)
            const newOwnedGame = [...currentUser.ownedGame, ...cartProduct]
            dispatch(setCurrentUser({ ...currentUser, ownedGame: newOwnedGame }))
            dispatch(clearCart())
            dispatch(setCartProduct())
        }
    }


    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                setSuccess(false)
            }, 3000)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [success])
    return (
        <>
            {success ?
                <div className='cart'>
                    <div className="check-mark">
                        <MdOutlineDone />
                    </div>
                    <h2 className='notification'>All done! It's time to play</h2>
                </div>
                : <div className='cart'>
                    {cartProduct.length === 0 ?
                        <div className="cart-header">
                            <h1>YOUR CART IS EMPTY</h1>
                            <Link to="/">GET SOMETHING INTERESTING NOW</Link>
                        </div>
                        :
                        <>
                            <div className="cart-header">
                                <h1>PAYMENT</h1>
                            </div>
                            <div className="cart-body">
                                <ul className="cart-list">
                                    {cartProduct.map((game) => {
                                        const { id, gameImage, name, price, discount, brand } = game
                                        return <li key={id} className="cart-item">
                                            <div className="left">
                                                <div className="img-container">
                                                    <img src={gameImage} alt="" />
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="cart-item-name">
                                                    <h2>{name}</h2>
                                                    <h5>{brand}</h5>
                                                </div>
                                                {discount === 0 ?
                                                    <div className="cart-item-price-container">
                                                        <div className="price-only">
                                                            ${price}
                                                        </div>
                                                        <div className="remove-btn">
                                                            <button onClick={() => {
                                                                dispatch(removeFromCart(id))
                                                                dispatch(setCartProduct())
                                                            }}>Remove</button>
                                                        </div>
                                                    </div>
                                                    : <div className="cart-item-price-container">
                                                        <div className="left">
                                                            <div className="cart-item-discount">
                                                                -{discount}%
                                                            </div>
                                                        </div>
                                                        <div className="right">
                                                            <div className="cart-item-old-price">
                                                                ${price}
                                                            </div>
                                                            <div className="cart-item-new-price">
                                                                ${price - price * (discount / 100)}
                                                            </div>
                                                        </div>
                                                        <div className="remove-btn">
                                                            <button onClick={() => {
                                                                dispatch(removeFromCart(id))
                                                                dispatch(setCartProduct())
                                                            }}>Remove</button>
                                                        </div>
                                                    </div>}
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className="cart-bottom">
                                <div className="cart-payment">
                                    <div className="total-payment">
                                        <div className="left">
                                            <h4>Total:</h4>
                                        </div>
                                        <div className="right">
                                            <h4>
                                                ${cartProduct.reduce((total, game) => {
                                                    const { price, discount } = game
                                                    return total + price - price * (discount / 100)
                                                }, 0)}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="payment-method">
                                        <div className="left">
                                            Payment method
                                        </div>
                                        <div className="right">
                                            <select name="payment" id="payment-method">
                                                <option value="momo">MOMO</option>
                                                <option value="credit">CREDIT CARD</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="payment-info">
                                        <div className="left">
                                            Phone Number
                                        </div>
                                        <div className="right">
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="cart-btn">
                                        <button onClick={() => {
                                            handlePayment()
                                        }}>Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </>}

                </div>}
        </>

    )
}

export default Cart