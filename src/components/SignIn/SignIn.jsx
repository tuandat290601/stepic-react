import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {FaGooglePlusG, FaFacebookF } from "react-icons/fa";
import {setForm} from "../../features/login/loginSlice"
import axios from 'axios';

import "./SignIn.sass"

const SignIn = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState([])

  useEffect(()=>{
    axios.post("https://stepic.herokuapp.com/api/auth/register").then(respone=>setLoginData(respone)).catch(err=>console.log(err))
  },[])
  

  return (
    <form className='login-form'>
        <img src="/img/logo.png" alt="logo" className="logo" />
        <div className="inputs-container">
          <div className="input-container">
            <input type="text" className='info-input' placeholder='Email'/>
          </div>
          <div className="input-container">
            <input type="password" className='info-input' placeholder='Password'/>
          </div>
        </div>
        <button className="login-btn" >
          Login
        </button>
        <p className='link color-white'>Don't have an account yet? <span onClick={()=>dispatch(setForm("signup"))}>Sign up</span> or sign in with</p>
        <div className="signin-btns-container">
          <button className="google">
            <div className="icon">
              <FaGooglePlusG/>
            </div>
            <p>Google</p></button>
          <button className="facebook">
            <div className="icon">
              <FaFacebookF/>
            </div>
            <p>Facebook</p></button>
        </div>
    </form>
  )
}

export default SignIn