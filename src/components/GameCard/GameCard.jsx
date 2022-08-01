import React from 'react'
import { Link } from "react-router-dom"
import "./GameCard.sass"
import { BsArrowRight } from "react-icons/bs";


const GameCard = (game) => {
  const { id, name, discount, gameImage, price } = game
  return (
    <li className='game-card'>
      <Link to={"/game/" + id}>
        <div className="game-card-img">
          <img src={gameImage} alt={name} />
        </div>
        <div className="info-container">
          <div className="info-container-left">
            <p className="info-name">{name}</p>
            <div className="info-price-container">
              {discount !== 0 && (
                <p className="info-discount">
                  ${discount}
                  <BsArrowRight />
                </p>
              )}
              <p className="info-price">
                ${price - price * (discount / 100)}
              </p>
            </div>
          </div>
          <div className="info-container-right">
            <button className="add-to-cart-btn">Add to cart</button>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default GameCard