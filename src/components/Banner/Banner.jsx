import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import "./Banner.sass"
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs";

const Banner = () => {
    const { productList } = useSelector(store => store.product)
    const [currentBanner, setCurrentBanner] = useState(0)
    const [list, setList] = useState(productList)
    const [mainBanner, setMainBanner] = useState(null)

    const handleBanner = (index) => {
        setCurrentBanner(index)
        setMainBanner(list[index].gameImage)
    }
    const sortByDate = (array) => {
        let newArray = array.slice(0, 4)
        return newArray.sort((p1, p2) => {
            return new Date(p2.publishDate) - new Date(p1.publishDate)
        })
    }

    useEffect(() => {
        setList(sortByDate(productList))
    }, [productList])

    useEffect(() => {
        if (list.length !== 0) {
            handleBanner(0)
        }
    }, [list])


    useEffect(() => {
        if (list.length !== 0) {
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
            <section className='banner-container' >
                <div className="banner-content" >

                    <div className="main-banner-container">
                        <img className='main-banner-img' src={mainBanner} alt="" />
                        <div className="main-banner-blur"></div>
                        <div className="main-banner-info">
                            <div className="main-banner-logo">
                                <img src={list[currentBanner].logoImage} alt="" />
                            </div>
                            <p>{list[currentBanner].status}</p>
                            <p>{list[currentBanner].shortDesc}</p>
                            <div className="price">
                                {list[currentBanner].discount !== 0 ? <>
                                    <p className='old-price'>${list[currentBanner].price} </p> <BsArrowRight />
                                </> : null}

                                <h5 className='new-price'>${list[currentBanner].price * (100 - list[currentBanner].discount) / 100}</h5>
                            </div>
                            <div className="main-banner-btn-container">
                                <button className='main-banner-btn blue-background'>Add to Cart</button>
                                <Link to={`/game/${list[currentBanner].id}`} className='main-banner-btn orange-background'>Buy now</Link>
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
            </section>
        </>
    )
}

export default Banner