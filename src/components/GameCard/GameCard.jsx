import React from 'react'
import {Link} from "react-router-dom"
import "./GameCard.sass"

const GameCard = (game) => {
  const {id, name, discount, gameImage, price} = game
  return (
    <li className='game-card'>
      <Link to = {"/game/" + id}>
        <div className="game-card-img">
          <img src={gameImage} alt={name} />
        </div>
        <div className="game-card-info">
          <p className='game-card-name'>{name}</p>
          <p>${price}</p>
        </div>
      </Link>
    </li>
  )
}

export default GameCard