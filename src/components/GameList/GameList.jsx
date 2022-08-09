import React from 'react'
import { useSelector } from 'react-redux'
import GameCard from '../GameCard/GameCard'

import "./GameList.sass"


const GameList = () => {
  const { filteredProductList } = useSelector(store => store.product)
  return (
    <div className="game-list container">
      <ul className='row'>
        {filteredProductList.map((game) => {
          return <GameCard key={game.id} {...game} />
        })}
      </ul>
    </div>
  )
}

export default GameList