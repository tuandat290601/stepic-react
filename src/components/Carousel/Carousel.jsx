import React, { useEffect, useState, } from "react";
import Flickity from "react-flickity-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../ultils/formatDate";
import "./Carousel.sass";

const Carousel = () => {
    const { productList } = useSelector(store => store.product)
    const [list, setList] = useState([])

    const getComingSoon = () => {
        let currentDate = formatDate(new Date().toISOString().slice(0, 10)).replaceAll("/", "")
        let newList = [...productList]
        return newList
    }


    useEffect(() => {
        let newList = getComingSoon()
        setList(newList)
    }, [])

    const flickityOptions = {
        initialIndex: 0,
        autoPlay: 3000,
        wrapAround: true,
        groupCells: 3
    };
    return (
        <section className='carousel'>
            <div className="title">
                <span>Coming</span> Soon
            </div>
            <div className="carousel-container">
                <Flickity options={flickityOptions}>
                    {list.map((game) => {
                        const {
                            id,
                            name,
                            gameImage
                        } = game;
                        return (
                            <div key={id} className="carousel-card">
                                <img src={gameImage} alt={name} />

                            </div>
                        )
                    })}
                </Flickity>
            </div>
        </section>
    )
}


export default Carousel