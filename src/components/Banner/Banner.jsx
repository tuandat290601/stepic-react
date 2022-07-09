import React, { useEffect, useState } from 'react'
import "./Banner.sass"


import API from "../../common/API/API"

import { BsArrowRight } from "react-icons/bs";

const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0)
    const [list, setList] = useState([])
    const [mainBanner, setMainBanner] = useState(null)

    const assignData = async (data) => {
        setList(data)
        setMainBanner(data[0].gameImage)
    }

    const handleBanner = (index) => {
        setCurrentBanner(index)
        setMainBanner(list[index].gameImage)
    }

    const getMovie = async () => {
        await API.get("/product").then(res => {
            assignData(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getMovie();
    }, [])

    useEffect(() => {
        if (list) {
            const timeout = setTimeout(() => {
                if (currentBanner === list.length - 1) {
                    handleBanner(0)
                }
                else {
                    handleBanner(currentBanner + 1)
                }
            }, 2500)
            return () => {
                clearTimeout(timeout)
            }
        }
    })
    return (
        <>
            {list.length !== 0 ? <section className='banner-container' >
                <div className="banner-content" >

                    <div className="main-banner-container">
                        <img className='main-banner-img' src={mainBanner} alt="" />
                        <div className="main-banner-blur"></div>
                        <div className="main-banner-info">
                            <div className="main-banner-logo">
                                <img src={list[currentBanner].logoImage} alt="" />
                            </div>
                            <p>{list[currentBanner].status}</p>
                            <p>{list[currentBanner].description}</p>
                            <div className="price">
                                {list[currentBanner].discount !== 0 ? <>
                                    <p className='old-price'>${list[currentBanner].price} </p> <BsArrowRight />
                                </> : null}

                                <h5 className='new-price'>${list[currentBanner].price}</h5>
                            </div>
                            <div className="main-banner-btn-container">
                                <button className='main-banner-btn blue-background'>Add to Cart</button>
                                <button className='main-banner-btn orange-background'>Buy now</button>
                            </div>
                        </div>
                    </div>
                    <ul className="sub-banner-list">
                        {list.map((item, index) => {
                            const { id, gameImage } = item
                            if (index !== currentBanner) {
                                return <li style={{ filter: "grayscale(1)" }} className='sub-banner-container' key={id} onClick={() => {
                                    handleBanner(index)
                                }}>
                                    <img className='sub-banner-img' src={gameImage} alt="" />
                                </li>
                            }
                            else {
                                return <li className='sub-banner-container' key={id} onClick={() => {
                                    handleBanner(index)
                                }}>
                                    <img className='sub-banner-img' src={gameImage} alt="" />
                                </li>
                            }
                        })}
                    </ul>
                </div >
            </section> : null}
        </>
    )
}

export default Banner