import React from 'react'
import {Banner, Carousel} from '../../components'

import "./Home.sass"

const Home = () => {
  return (
    <main className='home'>
      <Banner/>
      <Carousel/>
    </main>
  )
}

export default Home