import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-animated-slider';
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import '../App.css';
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay]);




const Slide = (props) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [data, setData] = useState([])
    const tv = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
    const movie = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    const pathname = window.location.pathname;


    useEffect(() => {
        // Fetch call
        let mounted = true;
        if (mounted) {
            async function getSliderMovies() {
                const response = await fetch(pathname === '/react-movie-database/' ? movie : tv);
                const movies = await response.json()
                setData(movies.results)
            }
            getSliderMovies()
        }


        // Clean up
        return () => {
            mounted = false;
        }
    }, [pathname, movie, tv])
    console.log(data)

    // Slider.js Initialization
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        zoom: {
            maxRatio: 5,
        },
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 1500,
        },
        loop: true,
    })



    return (
        // <Slider autoplay={4000}
        //     minSwipeOffset="15px"
        //     touchDisabled="false"
        // >
        //     {data.map((item, index) => {
        //         return (
        //             <Link to={{
        //                 pathname: `${item.id}`
        //             }} key={index}>

        //                 <div
        //                     key={index}
        //                     id="slide-container"
        //                     style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
        //                 ></div>
        //                 <div className="center">
        //                     <h1>{pathname === '/react-movie-database/' ? item.title : item.name}</h1>
        //                     <p>{item.overview}</p>
        //                 </div>
        //             </Link>
        //         )
        //     })}
        // </Slider>

        <div class="swiper-container">

            <div class="swiper-wrapper">
                {data.map((item, index) => {
                    return (
                        <Link to={{
                            pathname: `${item.id}`
                        }} key={index}
                            className="swiper-slide"
                            style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                        >


                            <div className="center" >
                                <h1>{pathname === '/react-movie-database/' ? item.title : item.name}</h1>
                                <p>{item.overview}</p>
                            </div>
                        </Link>
                    )
                })}
                {/* <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
                <div class="swiper-slide">Slide 5</div>
                <div class="swiper-slide">Slide 6</div>
                <div class="swiper-slide">Slide 7</div>
                <div class="swiper-slide">Slide 8</div>
                <div class="swiper-slide">Slide 9</div>
                <div class="swiper-slide">Slide 10</div> */}
            </div>

            <div class="swiper-pagination"></div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <div class="swiper-scrollbar"></div>
        </div>
    )
}

export default Slide;