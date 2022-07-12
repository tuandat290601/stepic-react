import React, {useState, useEffect} from 'react'
import {Banner, HomeCategory} from '../../components'
import API from '../../common/API/API'
import { setProductList, setFilteredProduct } from '../../features/product/productSlice'
import {useDispatch, useSelector } from 'react-redux';

import "./Home.sass"

const Home = () => {
  const dispatch = useDispatch();

  const getProducts = async () => {
    let res = await API.get("/product")
    dispatch(setProductList(res.data))
    dispatch(setFilteredProduct(res.data))
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <main className='home'>
      <Banner/>
      <HomeCategory/>
    </main>
  )
}

export default Home