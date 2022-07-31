import React, { StrictMode } from "react";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";

import "./GameDetailHeader.sass";

const GameDetailHeader = () => {
  const { singleProduct } = useSelector((store) => store.product);
  const { name, price, discount, gameImage } = singleProduct;
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
              <li className="genre">Action</li>
              <li className="genre">Hack and Slat</li>
              <li className="genre">Tatic</li>
            </ul>
          </div>
          <div className="game-detail-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            unde aliquid libero veniam repudiandae autem eius tempore dolorem?
            Numquam cum neque consequatur facere, quia voluptate optio magnam
            illum sit doloremque!
          </div>
          <div className="purchase-container">
            <div className="left">
              {price === 0 ? (
                <h2>Free</h2>
              ) : (
                <div className="game-detail-price">
                  {discount === 0 ? (
                    <div className="price">{price}</div>
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
              <button className="purchase-btn">BUY</button>
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
