import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import "./Banner.sass"
import { BsArrowRight } from "react-icons/bs";
import { setCartProduct, addToCart } from '../../features/product/productSlice';
import { formatPrice } from '../../ultils/formatPriceToUSD';

const Banner = () => {
    const dispatch = useDispatch()

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
                            <p>{list[currentBanner].shortDesc}</p>
                            <div className="price">
                                {list[currentBanner].discount !== 0 ? <>
                                    <p className='old-price'>${formatPrice(list[currentBanner].price)} </p> <BsArrowRight />
                                </> : null}

                                {list[currentBanner].price === 0 ?
                                    <h5 className='new-price'>Free</h5>
                                    :
                                    <h5 className='new-price'>${formatPrice(list[currentBanner].price * (100 - list[currentBanner].discount) / 100)}</h5>}
                            </div>
                            <div className="main-banner-btn-container">
                                <button className='main-banner-btn blue-background' onClick={() => {
                                    dispatch(addToCart(list[currentBanner]))
                                    dispatch(setCartProduct())
                                }
                                }>
                                    Add to Cart
                                </button>
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