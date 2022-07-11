import React, {useEffect, useState,} from "react";
import Flickity from "react-flickity-component";
import API from "../../common/API/API"

const Carousel = () =>{
    const [list, setList] = useState([])
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
    useEffect(()=>{
        getGame()
    })
    const flickityOptions = {
        initialIndex: 0,
        autoPlay: 3000,
        wrapAround: true,
      };
    return(
        <>
        {list.length!==0 ? <section className='carousel'>
            <div className="Hot game">
                <span>Hot</span>game
            </div>
            <div className="carousel-container">
                <Flickity options={flickityOptions}>
                    {setList.map((game) =>{
                        const{
                            id,

                        } = game
                        return (
                            <div key={id} className="carousel-card">
                                <img></img>
                            </div>
                        )
                    })}
                </Flickity>
            </div>
        </section>:null}
        </>
    )
}


export default Carousel