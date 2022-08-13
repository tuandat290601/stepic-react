import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredProduct } from "../../features/product/productSlice"
import { formatPrice } from "../../ultils/formatPriceToUSD"
import "./Filter.sass"

const Filter = () => {
  const { productList, filteredProductList } = useSelector(store => store.product)
  const dispatch = useDispatch()

  let range = Math.max(...productList?.map(game => formatPrice(game.price)))
  const [maxPrice, setMaxPrice] = useState(range)

  const genreList = [...new Set([].concat(...productList.map(game => game.genres)))]
  const [checkedGenre, setCheckedGenre] = useState([])

  const checkGameValidChecked = (game) => {
    let valid = true
    checkedGenre.forEach((check) => {
      if (game.genres.indexOf(check) === -1) {
        valid = false
        return
      }
    })
    return valid
  }

  const handleChecked = (genre) => {
    if (checkedGenre.indexOf(genre) !== -1) {
      let newChecked = checkedGenre.filter(check => check !== genre)
      setCheckedGenre([...newChecked])
    }
    else {
      setCheckedGenre([...checkedGenre, genre])
    }
  }

  useEffect(() => {
    range = formatPrice(Math.max(...productList?.map(game => game.price)))
    setMaxPrice(range)
  }, [productList])
  useEffect(() => {
    let newList = productList.filter(game => formatPrice(game.price) <= maxPrice)
    dispatch(setFilteredProduct(newList))
    if (checkedGenre.length === 0) {
      dispatch(setFilteredProduct(newList))
    }
    else {
      newList = newList.filter(game => {
        return checkGameValidChecked(game)
      })
      console.log(newList)
      dispatch(setFilteredProduct(newList))
    }

  }, [maxPrice, checkedGenre])



  return (
    <aside id='filter'>
      <div className="filter-container">
        <div className="filter">
          <h5 className="filter-name">Limit Price:  ${maxPrice}</h5>
          <input type="range" name="price" id="filter-price" value={maxPrice} min="0" max={range} onChange={(e) => { setMaxPrice(e.target.value) }} />
        </div>
        <div className="filter">
          <h5 className="filter-name">
            Genres
          </h5>
          <ul className="genres-list">
            {genreList.map((genre, index) => {
              return <li key={index} className="genre">
                <input type="checkbox" name={genre} id={genre} onChange={(e) => {
                  handleChecked(e.target.name)
                }} />
                <label htmlFor={genre}>{genre}</label>
              </li>
            })}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Filter