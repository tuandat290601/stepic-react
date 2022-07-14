import React from 'react'
import { useDispatch } from 'react-redux'
import "./Sort.sass"
import { sortProduct } from '../../features/product/productSlice'

const Sort = () => {
  const dispatch = useDispatch();
  const hadleSelection = (e) => {
    dispatch(sortProduct(e.target.value))
  }
  return (
    <div className='sort'>
      <label htmlFor="sort-selection">Sort by:</label>
      <select name="sort" id="sort-selection" onChange={hadleSelection}>
        <option value="name-increase">A to Z</option>
        <option value="name-decrease">Z to A</option>
        <option value="price-increase">Lowest Price</option>
        <option value="price-decrease">Highest Price</option>
      </select>
    </div>
  )
}

export default Sort