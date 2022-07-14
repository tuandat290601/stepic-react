import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BsSearch, BsGlobe, BsChevronDown, BsPersonFill, BsCartFill } from "react-icons/bs"
import { MdLogout } from "react-icons/md";

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBIcon } from 'mdb-react-ui-kit';

import "./Navbar.sass"
import "../../App.sass"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../features/navbar/navbarSlice';
import {setFilteredProduct} from "../../features/product/productSlice"

const list = [{
  name: "VN",
  icon: "vn"
}, {
  name: "EN",
  icon: "gb uk"
}]


const Navbar = () => {
  let navigate = useNavigate();

  const {productList, filteredProductList} = useSelector(store=>store.product)

  const { currentUser } = useSelector(store => store.login)

  const [language, setLanguage] = useState("VN")
  const [languageList, setLanguageList] = useState(false)
  const [accountList, setAccountList] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const { currentPage } = useSelector(store => store.navbar)
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let newList = [...productList]
    newList = newList.filter((product)=>{
      return product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.brand.toLowerCase().includes(searchValue.toLowerCase())
    })
    setSearchValue("")
    dispatch(setFilteredProduct(newList))
    navigate("/game", {replace: true})
  }

  return (
    <>
      {currentPage !== "login" ? <nav className='navbar'>
        <div className="logo">
          <Link to="/" onClick={() => dispatch(setCurrentPage("home"))}>
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        <ul className="nav-list">
          <li className='nav-item'>
            <Link to="game" className={currentPage === "game" ? 'nav-link active' : 'nav-link'} onClick={() => dispatch(setCurrentPage("game"))}>game</Link>
          </li>
          <li className='nav-item'>
            <Link to="event" className={currentPage === "event" ? 'nav-link active' : 'nav-link'} onClick={() => dispatch(setCurrentPage("event"))}>event</Link>
          </li>
        </ul>
        <form className="search-container" onSubmit={handleSubmit}>
          <input value = {searchValue} type="text" className='search' placeholder='Search ...' onChange={(e)=>{setSearchValue(e.target.value)}}/>
          <button type='submit' className="search-btn">
            <BsSearch />
          </button>
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
                <Link to="payment">
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