import React from 'react'
import { Link } from 'react-router-dom'

import {FaFacebookSquare, FaYoutube} from "react-icons"

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import "./Navbar.sass"
import "../../App.sass"

const Footer = () => {
  console.log(languageList)
  return (
    <div class="footer_field">
        <footer>
            <div class="rights">
                <Link to = "/">
                    <img src="/img/logo.png" alt="" />
                </Link>
                <p>All rights reserved in VietName HCMUS. We always try to give you the most safety way to get the game that you want to play</p>
            </div>
            <div class="special_categories">
                <h1 class="title special_categories_title">
                    Categories
                </h1>
                
                <ul class="reference special_categories_reference">
                    <li class="top_discount">
                        <Link className="reference_link" to="top_discount">
                            <p>Top discount</p>
                        </Link>
                    </li>
                    <li class="news">
                        <Link className="reference_link" to="new_releases">
                            <p>New releases</p>
                        </Link>
                    </li>
                    <li class="hot">
                        <Link className="reference_link"to="hot">
                            <p>High rating</p>
                        </Link>
                    </li>
                </ul>
            </div>

            <div class="socials">
                <h1 class="title socials_title">
                    Socials
                </h1>

                <ul class="reference socials_reference">
                    <li class="youtube_link">
                        <Link className="reference_link" to="youtu.be/stepic">
                            <FaYoutube/>
                            <p>youtu.be/stepic</p>
                        </Link>
                    </li>
                    <li class="facebook_link">
                        <Link className="reference_link" to="facebook.com/stepic">
                            <FaFacebookSquare/>
                            <p>facebook.com/stepic</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
  )
}

export default Footer