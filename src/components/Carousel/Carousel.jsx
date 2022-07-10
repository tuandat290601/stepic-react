import React, {useState,} from "react";
import Flickity from "react-flickity-component";
import API from "../../common/API/API"

const Carousel = () =>{
    const [list, setList] = useState([])
    const [mainBanner, setMainBanner] = useState(null)

    const assignData = async (data) => {
        setList(data)
        setMainBanner(data[0].gameImage)
    }
    const getMovie = async () => {
        await API.get("/product").then(res => {
            assignData(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    };
    const flickityOptions = {
        initialIndex: 0,
        autoPlay: 3000,
        wrapAround: true,
      };
    return(
        <>
        {list.length!==0 ? <section className='carousel-container'>
            <div>
            </div>
        </section>:null}
        </>
    )
}


export default Carousel