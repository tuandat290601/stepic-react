

import React, {useState, useEffect} from 'react'
import {Banner, HomeCategory, Carousel} from '../../components'
import API from '../../common/API/API'
import { setProductList, setFilteredProduct } from '../../features/product/productSlice'
import {useDispatch, useSelector } from 'react-redux';


import "./Home.sass"

const Home = () => {
  const dispatch = useDispatch();
  const {productList} = useSelector(store => store.product)
  const getProducts = async () => {
    let res = await API.get("/product")
    dispatch(setProductList(res.data))
    dispatch(setFilteredProduct(res.data))
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (<>
  {productList.length === 0 ? null : <main className='home'>
      <Banner/>
      <Carousel/>
      <HomeCategory/>
    </main>}                                  
  </>
  )
}

export default Home