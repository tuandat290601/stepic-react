import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { setForm } from "../../features/login/loginSlice"
import "./SignUp.sass"
import "../SignIn/SignIn.sass"

const SignUp = () => {
  const dispatch = useDispatch();

  const [firstName, setFisrtName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [agreement, setAgreement] = useState(null)



  const [passwordType, setPasswordType] = useState("password")
  const [confirmType, setConfirmType] = useState("password")

  const [alert, setAlert] = useState(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Name check
    if (firstName === "" || lastName === "") {
      setAlert(true)
    }

    // Email check
    else if (!validateEmail(email)) {
      setAlert(true)
    }

    // Password check
    else if (confirm !== password || password === "") {
      setAlert(true)
    }
    else {
      setAlert(false)
    }
  }
  console.log(agreement)
  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <img src="/img/logo.png" alt="logo" className="logo" />
      <div className="inputs-container">
        <div className="user-name">
          <div className="input-container">
            <input type="text" className="info-input first-name" placeholder='First Name' value={firstName} onChange={(e) => setFisrtName(e.target.value)} />
            {alert && firstName === "" && <span className="alert">Enter your first name</span>}
          </div>
          <div className="input-container">
            <input type="text" className="info-input last-name" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {alert && lastName === "" && <span className="alert">Enter your last name</span>}
          </div>
        </div>
        <div className="input-container">
          <input type="text" className='info-input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          {alert && !validateEmail(email) && <span className="alert">Enter your correct email</span>}
          {alert && email === "" && <span className="alert">Enter your email</span>}
        </div>
        <div className="input-container">
          <input type={passwordType} className='info-input' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {alert && password === "" && <span className="alert">Enter your password</span>}
          <div className="hidden" onMouseDown={() => {
            setPasswordType("text")
          }} onMouseUp={() => {
            setPasswordType("password")
          }}>
            {passwordType === "password" ? <AiFillEyeInvisible className='color-white' /> : <AiFillEye className='color-white' />}
          </div>
        </div>
        <div className="input-container">
          <input type={confirmType} className='info-input' placeholder='Confirm Password' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          {alert && confirm !== password && <span className="alert">Confirm your correct password</span>}
          <div className="hidden" onMouseDown={() => {
            setConfirmType("text")
          }} onMouseUp={() => {
            setConfirmType("password")
          }}>
            {confirmType === "password" ? <AiFillEyeInvisible className='color-white' /> : <AiFillEye className='color-white' />}
          </div>
        </div>
        <div className="input-container">
          <div className="policy-container">
            <input type="checkbox" name="policy" id="policy" onClick={(e) => setAgreement(e.target.checked)} />
            <label htmlFor="policy">I accept the Terms of Use & Privacy Policy</label>
          </div>
          {alert && !agreement && <span className='alert'>Please accept the Terms of Use & Privacy Policy</span>}
        </div>
      </div>
      <div className="login-btn-container">
        <button className="login-btn">
          Sign Up
        </button>
      </div>
      <p className='link color-white'>Already have an account? <span onClick={() => dispatch(setForm("signin"))}>Sign in</span></p>
    </form>
  )
}

export default SignUp