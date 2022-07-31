import React from 'react'
import { GameDetailBody, GameDetailHeader } from "../../components"

import "./GameDetail.sass"

const GameDetail = () => {
  return (
    <div className='game-detail'>
      <GameDetailHeader />
      <GameDetailBody />
    </div>
  )
}

export default GameDetail