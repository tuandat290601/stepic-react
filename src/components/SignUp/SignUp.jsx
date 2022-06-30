import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {setForm} from "../../features/login/loginSlice"

const SignUp = () => {
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password")
  const [confirmType, setConfirmType] = useState("password")

  return (
    <form className='login-form'>
        <img src="/img/logo.png" alt="logo" className="logo" />
        <div className="inputs-container">
          <div className="user-name">
            <div className="input-container">
              <input type="text" className="info-input first-name" placeholder='First Name'/>
            </div>
            <div className="input-container">
              <input type="text" className="info-input last-name" placeholder='Last Name'/>
            </div>
          </div>
          <div className="input-container">
            <input type="text" className='info-input' placeholder='Email'/>
          </div>
          <div className="input-container">
            <input type={passwordType} className='info-input'placeholder='Password'/>
            <div className="hidden" onMouseDown={()=>{
              setPasswordType("text")
            }} onMouseUp={()=>{
              setPasswordType("password")
            }}>
              {passwordType === "password" ? <AiFillEyeInvisible className='color-white'/> : <AiFillEye className='color-white'/>}
            </div>
          </div>
          <div className="input-container">
            <input type={confirmType} className='info-input' placeholder='Confirm Password'/>
               <div className="hidden" onMouseDown={()=>{
              setConfirmType("text")
            }} onMouseUp={()=>{
              setConfirmType("password")
            }}>
              {confirmType === "password" ? <AiFillEyeInvisible className='color-white'/> : <AiFillEye className='color-white'/>}
            </div>
          </div>
        </div>
        <button className="login-btn">
          Sign Up
        </button>
        <p className='link color-white'>Already have an account? <span onClick={()=>dispatch(setForm("signin"))}>Sign in</span></p>
    </form>
  )
}

export default SignUp