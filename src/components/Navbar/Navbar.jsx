import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {BsSearch, BsGlobe, BsChevronDown, BsPersonFill, BsCartFill} from "react-icons/bs"
import { MdLogout } from "react-icons/md";

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBIcon } from 'mdb-react-ui-kit';

import "./Navbar.sass"
import "../../App.sass"
import { useSelector } from 'react-redux';

const list = [{
  name: "VN",
  icon: "vn"
}, {
  name: "EN",
  icon: "gb uk"
}]

const Navbar = () => {

  const {currentUser} = useSelector(store => store.login)

  const [language, setLanguage] = useState("VN")
  const [languageList, setLanguageList] = useState(false)
  const [accountList, setAccountList] = useState(false)
  console.log(languageList)
  return (
    <nav className='navbar'>
      <div className="logo">
        <Link to = "/">
          <img src="/img/logo.png" alt="" />
        </Link>
      </div>
      <ul className="nav-list">
        <li className='nav-item'>
          <Link to = "game" className='nav-link'>game</Link>
        </li>
        <li className='nav-item'>
          <Link to = "event" className='nav-link'>event</Link>
        </li>
      </ul>
      <div className="search-container">
        <input type="text" className='search' placeholder='Search ...' />
        <div className="search-btn">
          <BsSearch/>
        </div>
      </div>
      <div className="account-container">
        <div className="language-container" onClick={()=>setLanguageList(!languageList)}>
          <div className="language-icon">
            <BsGlobe/>
          </div>
          <div className="current-language" >
            {language}
          </div>
          <div className = {languageList ? "language-icon rotate-180" : "language-icon rotate-0"} >
            <BsChevronDown/>
          </div>
          {languageList ? <ul className="language-sub-list">
            {list.map((item, index)=>{
              const {name, icon} = item
              return <li key={index} onClick={()=>{
                setLanguage(name)
                setLanguageList(!languageList)
              }
              }>{<MDBIcon flag={icon} />}{name}</li>
            })}
          </ul> : null}
        </div>
        {currentUser !== "" ? <div className="account" onClick={()=>setAccountList(!accountList)}>
          <div className="account-avatar">
            <img src="https://znews-stc.zdn.vn/static/topic/person/justin.jpg" alt="" />
          </div>
          <div className = {accountList ? "account-icon rotate-180" : "account-icon rotate-0"}>
            <BsChevronDown/>
          </div>
          {accountList ? <ul className="account-nav-list">
            <li>
              <BsPersonFill/>
              My account
            </li>
            <li>
              <Link to = "payment">
                <BsCartFill/>
                My Cart
              </Link>
            </li>
            <li>
              <MdLogout/>
              Sign out
            </li>
          </ul> : null}
        </div> : <Link to = "login" className='account link-to-login'>Sign In</Link>}
      </div>
    </nav>
  )
}

export default Navbar