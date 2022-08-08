import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSingleProduct,
  setCartProduct,
  addToCart,
} from "../../features/product/productSlice";

import { BsArrowRight, BsCart, BsCartCheck, BsDownload } from "react-icons/bs";
import "../HomeCategory/HomeCategory.sass"
import "./GameCard.sass"

const GameCard = (game) => {
  const { id, name, discount, gameImage, price } = game

  const { cartProduct } = useSelector((store) => store.product);

  const { currentUser } = useSelector(store => store.login)
  const dispatch = useDispatch()

  const added = cartProduct.filter(product => product.id === game.id)

  const checkBoughtProduct = (id) => {
    let bought = false
    if (currentUser !== null) {
      currentUser.ownedGame.forEach(game => {
        if (game.id === id) {
          bought = true
          return bought
        }
      })
    }
    return bought
  }
  return (
    <li className='game-card'>
      <div className="game-card-img">
        <img src={gameImage} alt={name} />
      </div>
      <div className="info-container">
        <div className="info-container-left">
          <Link to={`/game/${id}`} className="info-name" onClick={() => dispatch(setSingleProduct({ ...game }))}>{name}</Link>
          <div className="info-price-container">
            {discount !== 0 && (
              <p className="info-discount">
                ${discount}
                <BsArrowRight />
              </p>
            )}
            {price !== 0 ? <p className="info-price">
              ${price - price * (discount / 100)}
            </p> : <p className="info-price">
              Free
            </p>}
          </div>
        </div>
        <div className="info-container-right">
          {checkBoughtProduct(id) === true ? <button className="add-to-cart-btn disabled" >
            <BsDownload />
          </button> : <>
            {added.length !== 0 ?
              <button className="add-to-cart-btn disabled" >
                <BsCartCheck />
              </button>
              :
              <button className="add-to-cart-btn" onClick={() => {
                dispatch(addToCart(game))
                dispatch(setCartProduct())
              }
              }><BsCart /></button>
            }
          </>}

        </div>
      </div>
    </li>
  )
}

export default GameCard