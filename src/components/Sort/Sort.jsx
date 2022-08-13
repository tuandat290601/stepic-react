import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Sort.sass"
import { sortProduct } from '../../features/product/productSlice'
import { useEffect } from 'react'

const Sort = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector(store => store.product)
  const hadleSelection = (e) => {
    dispatch(sortProduct(e.target.value))
  }
  useEffect(() => {
    if (sort !== "") {
      dispatch(sortProduct(sort))
    }
  }, [])
  return (
    <div className='sort'>
      <label htmlFor="sort-selection" >Sort by:</label>
      <select name="sort" id="sort-selection" defaultValue={sort} onChange={hadleSelection}>
        <option value="name-increase">A to Z</option>
        <option value="name-decrease">Z to A</option>
        <option value="price-increase">Lowest Price</option>
        <option value="price-decrease">Highest Price</option>
        <option value="Top Discount">Top Discount</option>
        <option value="Highest Rating">Highest Rating</option>
      </select>
    </div>
  )
}

export default Sort