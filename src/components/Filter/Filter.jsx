import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setFilteredProduct } from "../../features/product/productSlice"
import "./Filter.sass"

const Filter = () => {
  const { productList, filter } = useSelector(store => store.product)
  const dispatch = useDispatch()

  let range = Math.max(...productList?.map(game => game.price))
  const brandList = [...new Set(productList.map(game => game.brand))]

  const [maxPrice, setMaxPrice] = useState(range / 2)
  useEffect(() => {
    range = Math.max(...productList?.map(game => game.price))
    setMaxPrice(range / 2)
  }, [productList])
  useEffect(() => {
    let newList = productList.filter(game => game.price <= maxPrice)
    dispatch(setFilteredProduct(newList))
  }, [maxPrice])
  return (
    <aside id='filter'>
      <div className="filter-container">
        <div className="filter">
          <h5 className="filter-name">Limit Price: ${maxPrice}</h5>
          <input type="range" name="price" id="filter-price" value={maxPrice} min="0" max={range} onChange={(e) => { setMaxPrice(e.target.value) }} />
        </div>
      </div>
    </aside>
  )
}

export default Filter