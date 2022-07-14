import React, {useState} from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Sort, Filter, GameList } from '../../components'

import "./Game.sass"

const Game = () => {
  const {filteredProductList} = useSelector(store => store.product)
  const {searchKey} = useSelector(store => store.navbar)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(filteredProductList.length !== 0)  {
      setLoading(false)
    }
  },[filteredProductList])

  return (<>
  {loading ? null : <div id = "game-page">
      <div className="game-page-container">
        <div className="game-page-header">
          <div className="result-notice">
            Results for: {searchKey}
          </div>
          <Sort/>
        </div>
        <hr />
        <div className="game-page-body">
          <GameList/>
          <Filter/>
        </div>
      </div>
    </div>}
    
  </>
  )
}

export default Game