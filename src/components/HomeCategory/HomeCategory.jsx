import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {setFilteredProduct} from "../../features/product/productSlice"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import { formatDate } from '../../ultils/formatDate'

import "./HomeCategory.sass"

const HomeCategory = () => {
    const navList = ["Top Discount", "New Release", "Highest Rating"]
    const [discountList, setDiscountList] = useState([])
    const [newreleaseList, setNewreleaseList] = useState([])
    const [highrateList, setHighrateList] = useState([])
    const [displayList, setDisplayList] = useState([])
    
    const {productList,filteredProductList} = useSelector(store => store.product)
    const dispatch = useDispatch();
    
    const [category, setCategory] = useState("Top Discount")

    const getDiscountList = () => {
        let newList = [...productList]
        return newList.sort((productA, productB)=>{
            return productB.discount - productA.discount
        })
    }

    const getHighRating = () => {
        let newList = [...productList]
        return newList.sort((productA, productB)=>{
            return productB.rating - productA.rating
        })
    }

    const getNewRelease = () => {
        let currentDate = formatDate(new Date().toISOString().slice(0, 10)).replaceAll("/", "")
        let newList = [...productList]
        return newList.filter(product=>{
            const {publishDate} = product
            let date = formatDate(publishDate).replaceAll("/", "")
            console.log(currentDate, date)
            return date <= currentDate
        }).sort((productA, productB)=>{
            return new Date(productB.publishDate) - new Date(productA.publishDate)
        })
    }

    useEffect(()=>{
        setDiscountList(getDiscountList())
        setNewreleaseList(getNewRelease())
        setHighrateList(getHighRating())
    },[productList])

    
    const handleCategoryList = () => {
        if(category === "Top Discount"){
            setDisplayList(discountList.slice(0,7))
            dispatch(setFilteredProduct(discountList))
        }
        else if (category === "New Release"){
            setDisplayList(newreleaseList.slice(0,7))
            dispatch(setFilteredProduct(newreleaseList))
        }
        else {
            setDisplayList(highrateList.slice(0,7))
            dispatch(setFilteredProduct(highrateList))
        }
    }

    useEffect(()=>{
        handleCategoryList();
    },[category, productList])


  return (
    <section id = "home-category">
        <div className="home-category-navbar">
            <ul className="home-category-navlist">
                {navList.map((navitem, index)=>{
                    return <li key = {index} className={navitem === category ? "home-category-navitem active" : "home-category-navitem" } onClick = {()=>setCategory(navitem)}
                    >{navitem}</li>
                })}
            </ul>
        </div>
        <div className="home-category-list-container">
                <ul className="home-category-list">
                    {displayList.map((item,index)=>{
                        const {id, gameImage, name} = item
                        return <Link to = {`/game/${id}`} key = {index} className = "home-category-item">
                            <div className="img-container">
                                <img src={gameImage} alt={name} className="game-image" />
                                <div className="blur-container"></div>
                            </div>
                            <div className="info-container">
                                <p className="game-name">{name}</p>
                            </div>
                        </Link>
                    })}
                    {displayList.length !==0 && <Link to = "/game" className = "home-category-item">
                            <div className="img-container">
                                <img src={discountList[8].gameImage} className="game-image" />
                                <div className="blur-container">
                                   See more <HiOutlineArrowNarrowRight />
                                </div>
                            </div>
                            <div className="info-container">
                                <p className="game-name"></p>
                            </div>
                    </Link>}
                    
                </ul>
        </div>
    </section>
  )
}

export default HomeCategory