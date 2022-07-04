import React from 'react'

import {FaFacebookSquare, FaYoutube} from "react-icons"

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import "./Navbar.sass"
import "../../App.sass"

const Footer = () => {
  console.log(languageList)
  return (
    <div class="footer_field">
        <footer>
            <div class="footer_head">
                <h4>ABOUT US</h4>
            </div>
            
            <div class="footer_content">
                <p class="text_content">
                    Stepic is a website for gamers who is fond of playing games 
                    and enjoy the simplicity of purchasing products from our beloved publishers. 
                    We strive to bring the best experience to our customers with 
                    consistency, simplicity and effectiveness.
                </p>
    
                <div class="href_content">
                    <div class="reference">
                        <a href="youtu.be/stepic">
                            <FaFacebookSquare/>
                            <p>youtu.be/stepic</p>
                        </a>
                    </div>
                    <div class="reference">
                        <a href="facebook.com/stepic">
                            <FaYoutube/>
                            <p>facebook.com/stepic</p>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer