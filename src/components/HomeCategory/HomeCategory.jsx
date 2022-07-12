import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setFilteredProduct} from "../../features/product/productSlice"

const HomeCategory = () => {
    const navList = ["Top Discount", "New Release", "Highest Rating"]
    
    
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

    const getNewRelease = ()=> {
        let newList = [...productList]
        return newList.filter(product=>{
            return 
        }).sort((productA, productB)=>{
            return productB.rating - productA.rating
        })
    }

    useEffect(()=>{
        if(category === "Top Discount") {
            dispatch(setFilteredProduct(getDiscountList()))
        }else if(category === "Highest Rating") {
            dispatch(setFilteredProduct(getHighRating()))
        }
        else {
            dispatch(setFilteredProduct(getHighRating()))
        }
    },[category])

    console.log(filteredProductList)

  return (
    <section id = "home-category">
        <div className="home-category-navbar">
            <ul className="home-category-navlist">
                {navList.map((navitem, index)=>{
                    return <li key = {index} className={navitem === category ? "home-category-navitem active" : "home-category-navitem" } onClick = {()=>{setCategory(navitem)}}>{navitem}</li>
                })}
            </ul>
        </div>
    </section>
  )
}

export default HomeCategory