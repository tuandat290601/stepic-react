import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import {
  addToCart,
  setCartProduct
} from "../../features/product/productSlice"

import "./GameDetailHeader.sass";

const GameDetailHeader = () => {
  const dispatch = useDispatch()
  const { singleProduct, cartProduct } = useSelector((store) => store.product);
  const { id, name, price, discount, gameImage, shortDesc, genres } = singleProduct;

  const [bought, setBought] = useState(false)

  const { currentUser } = useSelector(store => store.login)

  useEffect(() => { //check whether this account already has this game 
    if (currentUser) {
      if (currentUser.ownedGame.map(game => game.id).includes(singleProduct.id)) {
        setBought(true)
      }
    }
  }, [currentUser])

  const checkAddedGame = (game) => {
    return cartProduct.filter(item => item.id === game.id).length > 0
  }

  return (
    <div className="game-detail-header">
      <div className="game-detail-header-container">
        <div className="game-detail-header-left">
          <div className="game-detail-header-img">
            <img src={gameImage} alt="" />
          </div>
        </div>
        <div className="game-detail-header-right">
          <div className="game-detail-name">
            <h1>{name}</h1>
          </div>
          <div className="game-detail-genre">
            <ul className="genre-list">
              {genres.map((genre, index) => {
                return <li key={index} className="genre">{genre}</li>
              })}

            </ul>
          </div>
          <div className="game-detail-description">
            {shortDesc}
          </div>
          <div className="purchase-container">
            <div className="left">
              {price === 0 ? (
                <h2>Free</h2>
              ) : (
                <div className="game-detail-price">
                  {discount === 0 ? (
                    <div className="price">${price}</div>
                  ) : (
                    <>
                      <div className="discount-container">
                        <div className="old-price">${price}</div>
                        <div className="discount">-{discount}%</div>
                      </div>
                      <div className="price">
                        ${price - price * (discount / 100)}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="right">
              {bought ?
                <button className="purchase-btn disable" disabled>DOWNLOAD</button>
                :
                <button className="purchase-btn" onClick={() => {
                  if (!checkAddedGame(singleProduct)) {
                    dispatch(addToCart(singleProduct))
                    dispatch(setCartProduct())
                  }
                }}>ADD TO CART</button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* <div className="game-detail-header-container">
        <ul className="game-develop">
          <li>
            <div className="title">Developer</div>
            .
          </li>
          <li></li>
          <li></li>
        </ul>
      </div> */}
    </div>
  );
};

export default GameDetailHeader;
