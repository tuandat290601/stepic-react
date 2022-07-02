import React, {useEffect, useState} from 'react'
import "./Banner.sass"

import { BsArrowRight } from "react-icons/bs";

const list = [
    {
        id: 0,
        img: "https://cdn2.unrealengine.com/egs-fall-guys-halo-carousel-desktop-1248x702-fc2c1f2f1d07.jpg?h=1080&resize=1&w=1920",
        logo: "https://cdn2.unrealengine.com/egs-saints-row-gold-ed-carousel-logo-500x309-44fce11ba866.png",
        name: "Fall guys",
        desc: "Reclaim the Dwarven homeland of Moria™. The only survival crafting video game set in the Fourth Age of Middle-earth™.",
        price: "199.00$",
        old_price: "200.00$",
        status: "comming soon"
    },
    {
        id: 1,
        img: "https://cdn2.unrealengine.com/egs-saints-row-gold-ed-carousel-desktop-1248x702-b42ef9052908.jpg?h=1080&resize=1&w=1920",
        logo: "https://cdn2.unrealengine.com/egs-saints-row-gold-ed-carousel-logo-500x309-44fce11ba866.png",
        name: "Fall guys",
        desc: "Reclaim the Dwarven homeland of Moria™. The only survival crafting video game set in the Fourth Age of Middle-earth™.",
        price: "199.00$",
        old_price: "200.00$",
        status: "comming soon"
    },
    {
        id: 2,
        img: "https://cdn2.unrealengine.com/egs-lotr-return-to-moria-carousel-desktop-1280x702-8737f30f4278.jpg?h=1080&resize=1&w=1920",
        logo: "https://cdn2.unrealengine.com/egs-saints-row-gold-ed-carousel-logo-500x309-44fce11ba866.png",
        name: "Fall guys",
        desc: "Reclaim the Dwarven homeland of Moria™. The only survival crafting video game set in the Fourth Age of Middle-earth™.",
        price: "199.00$",
        old_price: "200.00$",
        status: "comming soon"
    },
    {
        id: 3,
        img: "https://cdn2.unrealengine.com/egs-fall-guys-halo-carousel-desktop-1248x702-fc2c1f2f1d07.jpg?h=1080&resize=1&w=1920",
        logo: "https://cdn2.unrealengine.com/egs-saints-row-gold-ed-carousel-logo-500x309-44fce11ba866.png",
        name: "Fall guys",
        desc: "Reclaim the Dwarven homeland of Moria™. The only survival crafting video game set in the Fourth Age of Middle-earth™.",
        price: "199.00$",
        old_price: "200.00$",
        status: "comming soon"
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
            <div className="main-banner-blur"></div>
            <div className="main-banner-info">
                <div className="main-banner-logo">
                    <img src={list[currentBanner].logo} alt="" />
                </div>
                <p>{list[currentBanner].status}</p>
                <p>{list[currentBanner].desc}</p>
                <div className="price">
                    {list[currentBanner].old_price !== "" ?  <>
                    <p className='old-price'>{list[currentBanner].old_price} </p> <BsArrowRight/>
                    </>: null}
                    <h5 className='new-price'>{list[currentBanner].price}</h5>
                </div>
                <div className="main-banner-btn-container">
                    <button className='main-banner-btn blue-background'>Add to Cart</button>
                    <button className='main-banner-btn orange-background'>Buy now</button>
                </div>
            </div>
        </div>
        <ul className="sub-banner-list">
            {list.map((item,index)=>{
                const {id, img, name} = item
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