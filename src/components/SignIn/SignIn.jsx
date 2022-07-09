import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaGooglePlusG, FaFacebookF } from "react-icons/fa";
import { setForm } from "../../features/login/loginSlice"
import API from "../../common/API/API"

import "./SignIn.sass"
import { Navigate } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loginState, setLoginState] = useState(null)


  const setStatus = (status) => {
    setLoginState(status)
  }

  const navigateBack = () => {
    if (loginState === 200) {
      <Navigate to="/" />
    }
  }

  const checkAccount = async (e, p) => {
    await API.post("/auth / login",
      JSON.stringify({
        email: e,
        password: p,
      }
      )
    ).then(res => {
      setStatus(res.status)
      console.log(res.status)
    }).catch(err => {
      console.log(err)
      setStatus(err.response.status)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkAccount(email, password)
  }


  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <img src="/img/logo.png" alt="logo" className="logo" />
      <div className="inputs-container">
        <div className="input-container">
          <input type="text" className='info-input' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="input-container">
          <input type="password" className='info-input' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
      </div>
      <div className='login-btn-container'>
        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>
        {loginState === 401 ? <span className='alert'>Your email or password is not correct</span> : null}
      </div>
      <p className='link color-white'>Don't have an account yet? <span onClick={() => dispatch(setForm("signup"))}>Sign up</span> or sign in with</p>
      <div className="signin-btns-container">
        <button className="google">
          <div className="icon">
            <FaGooglePlusG />
          </div>
          <p>Google</p></button>
        <button className="facebook">
          <div className="icon">
            <FaFacebookF />
          </div>
          <p>Facebook</p></button>
      </div>
    </form>
  )
}

export default SignIn