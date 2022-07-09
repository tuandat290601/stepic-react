import React, { useState, useEffect } from 'react'
import { SignIn, SignUp } from "../../components"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"


import "./Login.sass"
import { setCurrentPage } from '../../features/navbar/navbarSlice'


const Login = () => {
  const { form } = useSelector((store) => store.login)
  const dispatch = useDispatch();
  return (
    <div className='login'>
      <Link to="/" className="back-btn" onClick={() => dispatch(setCurrentPage("home"))}>
        <HiOutlineArrowNarrowLeft />
        <h5>Back to Home</h5>
      </Link>
      <div className="form-container">
        {form === "signin" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  )
}

export default Login