import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setFilteredProduct} from "../../features/product/productSlice"

import "./HomeCategory.sass"

const HomeCategory = () => {
    const navList = ["Top Discount", "New Release", "Highest Rating"]
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
        let currentDate = new Date().toISOString().slice(0, 10).replaceAll("-", "")
        let newList = [...productList]
        return newList.filter(product=>{
            const {publishDate} = product
            let date = publishDate.slice(0,10).replaceAll("/", "")
            return date <= currentDate
        }).sort((productA, productB)=>{
            return new Date(productB.publishDate) - new Date(productA.publishDate)
        })
    }

    
    const handleCategoryList = () => {
        if(category === "Top Discount"){
            setDisplayList(getDiscountList().slice(0,8))
        }
        else if (category === "New Release"){
            setDisplayList(getNewRelease().slice(0,8))
        }
        else {
            setDisplayList(getHighRating()).slice(0,8)
        }
    }
console.log(displayList)
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
                        const {gameImage, name} = item
                        return <li key = {index} className = "home-category-item">
                            {name}
                        </li>
                    })}
                </ul>
        </div>
    </section>
  )
}

export default HomeCategory