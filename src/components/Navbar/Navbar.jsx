import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BsSearch, BsGlobe, BsChevronDown, BsPersonFill, BsCartFill } from "react-icons/bs"
import { MdLogout } from "react-icons/md";

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBIcon } from 'mdb-react-ui-kit';

import "./Navbar.sass"
import "../../App.sass"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setSearchKey } from '../../features/navbar/navbarSlice';
import { setFilteredProduct, sortProduct, setCartProduct, removeFromCart, clearCart, setSingleProduct } from "../../features/product/productSlice"
import useViewport from "../../customhooks/useViewport"
import { formatPrice } from "../../ultils/formatPriceToUSD";

const list = [{
  name: "VN",
  icon: "vn"
}, {
  name: "EN",
  icon: "gb uk"
}]


const Navbar = () => {
  let navigate = useNavigate();

  const { productList, cartProduct } = useSelector(store => store.product)
  const { currentUser } = useSelector(store => store.login)
  const dispatch = useDispatch();

  const screenWidth = useViewport().width

  const [language, setLanguage] = useState("EN")
  const [languageList, setLanguageList] = useState(false)
  const [accountList, setAccountList] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isResultOpen, setIsResultOpen] = useState(false)

  const { currentPage } = useSelector(store => store.navbar)

  const handleSubmit = (e) => {
    e.preventDefault();
    let newList = [...productList]
    let result = newList.filter((product) => {
      return product.name.toLowerCase().includes(searchValue.toLowerCase()) == true || product.brand.toLowerCase().includes(searchValue.toLowerCase()) == true
    })
    setSearchValue("")
    dispatch(setFilteredProduct(result))
    dispatch(sortProduct("name-increase"))
    dispatch(setSearchKey(searchValue))
    navigate("/game", { replace: true })
  }

  const handleCart = () => {
    if (currentUser) {
      let owned = [...currentUser.ownedGame].map((game) => game.id)
      let newCart = cartProduct.filter((game) => {
        return owned.indexOf(game.id) !== -1
      }).map((game) => game.id)
      newCart.forEach((game) => {
        dispatch(removeFromCart(game))
      })
      dispatch(setCartProduct())
    }
  }

  return (
    <>
      {currentPage !== "login" ? <nav className={screenWidth >= 1280 ? 'navbar navbar-padding' : 'navbar'}>
        <div className="logo">
          <Link to="/" onClick={() => dispatch(setCurrentPage("home"))}>
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        <ul className="nav-list">
          <li className='nav-item'>
            <Link to="game" className={currentPage === "game" ? 'nav-link active' : 'nav-link'}
              onClick={() => {
                dispatch(setCurrentPage("game"))
                dispatch(setFilteredProduct(productList))
                dispatch(sortProduct("name-increase"))
              }}>game</Link>
          </li>
          <li className='nav-item'>
            <Link to="event" className={currentPage === "event" ? 'nav-link active' : 'nav-link'} onClick={() => dispatch(setCurrentPage("event"))}>event</Link>
          </li>
        </ul>
        <form className="search-container" onSubmit={handleSubmit}>
          <input value={searchValue} type="text" className='search' placeholder='Search ...' onChange={(e) => { setSearchValue(e.target.value) }} />
          <button type='submit' className="search-btn">
            <BsSearch />
          </button>
          {searchValue !== "" && <div className="search-result-list-container">
            <ul className="search-result-list">
              {productList.filter((game) => {
                return game.name.toLowerCase().includes(searchValue.toLowerCase()) == true || game.brand.toLowerCase().includes(searchValue.toLowerCase()) == true
              }).map((game) => {
                let newPrice = formatPrice(game.price - game.price * (game.discount / 100))
                return <li key={game.id} className='search-result-container'>
                  <Link to={`/game/${game.id}`} className='search-result-link' onClick={() => {
                    dispatch(setSingleProduct(game))
                    setSearchValue("")
                  }}>
                    <div className="search-result-img">
                      <img src={game.gameImage} alt="" />
                    </div>
                    <div className="search-result-info-container">
                      <p className="search-result-name">{game.name}</p>
                      <div className="search-result-price-container">
                        <div className="search-result-price-top">
                          {game.discount !== 0 && <>
                            <div className="search-result-old-price">${formatPrice(game.price)}</div>
                            <div className="search-result-discount">-{game.discount}%</div>
                          </>}
                        </div>
                        <div className="search-result-price">
                          {newPrice == 0 ? `Free` : `$${newPrice}`}
                        </div>
                      </div>
                    </div>
                  </Link>

                </li>
              })}
            </ul>
          </div>}
        </form>
        <div className="account-container" >
          <div className="language-container" onClick={() => { setLanguageList(!languageList) }}>
            <div className="language-icon">
              <BsGlobe />
            </div>
            <div className="current-language" >
              {language}
            </div>
            <div className={languageList ? "language-icon rotate-180" : "language-icon rotate-0"} >
              <BsChevronDown />
            </div>
            {languageList ? <ul className="language-sub-list">
              {list.map((item, index) => {
                const { name, icon } = item
                return <li key={index} onClick={() => {
                  setLanguage(name)
                  setLanguageList(!languageList)
                }
                }>{<MDBIcon flag={icon} />}{name}</li>
              })}
            </ul> : null}
          </div>
          <div className="cart-container">
            <Link to="/payment" onClick={handleCart}>
              <BsCartFill />
            </Link>
            <div className="amount">
              {cartProduct.length}
            </div>
          </div>
          {currentUser !== null ? <div className="account" onClick={() => { setAccountList(!accountList) }}>
            <div className="account-avatar">
              <img src="https://znews-stc.zdn.vn/static/topic/person/justin.jpg" alt="" />
            </div>
            <div className={accountList ? "account-icon rotate-180" : "account-icon rotate-0"}>
              <BsChevronDown />
            </div>
            {accountList ? <ul className="account-nav-list">
              <li>
                <BsPersonFill />
                My account
              </li>
              <li>
                <Link>
                  <BsCartFill />
                  My Cart
                </Link>
              </li>
              <li>
                <MdLogout />
                Sign out
              </li>
            </ul> : null}
          </div> : <Link to="login" className='account link-to-login' onClick={() => dispatch(setCurrentPage("login"))}>Sign In</Link>}
        </div>
      </nav> : <></>}
    </>

  )
}

export default Navbar