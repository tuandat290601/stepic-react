import React, {useEffect, useState} from 'react'
import "./Banner.sass"

const list = [
    {
        id: 0,
        img: "https://cdn2.unrealengine.com/egs-fall-guys-halo-carousel-desktop-1248x702-fc2c1f2f1d07.jpg?h=1080&resize=1&w=1920"
    },
    {
        id: 1,
        img: "https://cdn2.unrealengine.com/egs-saints-row-gold-ed-carousel-desktop-1248x702-b42ef9052908.jpg?h=1080&resize=1&w=1920"
    },
    {
        id: 2,
        img: "https://cdn2.unrealengine.com/egs-lotr-return-to-moria-carousel-desktop-1280x702-8737f30f4278.jpg?h=1080&resize=1&w=1920"
    },
    {
        id: 3,
        img: "https://cdn2.unrealengine.com/egs-fall-guys-halo-carousel-desktop-1248x702-fc2c1f2f1d07.jpg?h=1080&resize=1&w=1920"
    }
]

const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0)
    const [mainBanner, setMainBanner] = useState(list[currentBanner].img)
    const handleBanner = (id) => {
        setCurrentBanner(id)
        setMainBanner(list[id].img)
    }
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(currentBanner === list.length - 1){
                handleBanner(0)
            }
            else {
                handleBanner(currentBanner + 1)
            }
        },2500)
        return () => {
            clearTimeout(timeout)
        }
    })
  return (
    <section className='banner-container'>
        <div className="main-banner-container">
            <img className='main-banner-img' src={mainBanner} alt="" />
        </div>
        <ul className="sub-banner-list">
            {list.map((item,index)=>{
                const {id, img} = item
                if(index!==currentBanner){
                    return <li style={{filter: "grayscale(1)"}} className='sub-banner-container' key = {id} onClick={()=>{
                        handleBanner(index)
                    }}>
                    <img className='sub-banner-img' src={img} alt="" />
                </li>
                }
                else{
                    return <li  className='sub-banner-container' key = {id} onClick={()=>{
                        handleBanner(index)
                    }}>
                    <img className='sub-banner-img' src={img} alt="" />
                </li>
                }
            })}
        </ul>
    </section>
  )
}

export default Banner