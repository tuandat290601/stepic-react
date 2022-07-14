import React, {useEffect, useState,} from "react";
import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";
import API from "../../common/API/API"
import "./Carousel.sass";

const Carousel = () =>{
    const [list, setList] = useState([])
    const [currentGame, setCurrentGame] = useState(0)
    const assignData = async (data) => {
        setList(data)
    }
    const getGame = async () => {
        await API.get("/product").then(res => {
            assignData(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    };
    useEffect(() => {
        getGame()
    }, [])
    const flickityOptions = {
        initialIndex: 0,
        autoPlay: 3000,
        wrapAround: true,
        groupCells: true
      };
    return(
        <section className='carousel'>
            <div className="title">
                <span>Hot</span> Games
            </div>
            <div className="carousel-container">
                <Flickity options={flickityOptions}>
                    {list.map((game) =>{
                        const{  
                            id,
                            name,
                            gameImage
                        } = game;
                        return (
                            <div key={id} className="carousel-card">
                                <Link to ={"/product/"+`${id}`}>
                                <img src ={gameImage} alt={name}/>
                                </Link>
                            </div>
                        )
                    })}
                </Flickity>
            </div>
        </section>
    )
}


export default Carousel