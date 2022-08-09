import React from 'react'
import { Link } from 'react-router-dom'

import {
    FaYoutube,
    FaFacebookSquare
} from "react-icons/fa";

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import "./Footer.sass"
import "../../App.sass"
import useViewport from '../../customhooks/useViewport';

const Footer = () => {
    const viewport = useViewport()
    const isMobile = viewport.width < 768
    return (
        <div className="footer_field">
            <footer className={isMobile ? "mobile-footer" : ""}>
                <div className="rights">
                    <Link to="/">
                        <img src="/img/logo.png" alt="" />
                    </Link>
                    <p>All rights reserved in VietName HCMUS. We always try to give you the most safety way to get the game that you want to play</p>
                </div>
                <div className="special_categories">
                    <h1 className="title special_categories_title">
                        Categories
                    </h1>

                    <ul className="reference special_categories_reference">
                        <li className="top_discount">
                            <Link className="reference_link" to="top_discount">
                                <p>Top discount</p>
                            </Link>
                        </li>
                        <li className="news">
                            <Link className="reference_link" to="new_releases">
                                <p>New releases</p>
                            </Link>
                        </li>
                        <li className="hot">
                            <Link className="reference_link" to="hot">
                                <p>High rating</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="socials">
                    <h1 className="title socials_title">
                        Socials
                    </h1>

                    <ul className="reference socials_reference">
                        <li className="youtube_link">
                            <Link className="reference_link" to="youtu.be/stepic">
                                <FaYoutube />
                                <p>youtu.be/stepic</p>
                            </Link>
                        </li>
                        <li className="facebook_link">
                            <Link className="reference_link" to="facebook.com/stepic">
                                <FaFacebookSquare />
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