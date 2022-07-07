import React, { useState } from 'react'
import "./ScrollButton.sass"
import { BsArrowUpShort } from "react-icons/bs";
const ScrollButton = () => {
    const [hiden, setHiden] = useState(true)

    const displayButton = () => {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 300) {
            setHiden(false)
        }
        else {
            setHiden(true)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', displayButton);

    return (
        <button className={!hiden ? 'scroll-btn' : 'hide'} onClick={scrollToTop}>
            <BsArrowUpShort />
        </button>
    )
}

export default ScrollButton