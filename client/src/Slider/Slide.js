import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import '../App.css';
// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination, Autoplay]);




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



    return (
        <Swiper
            spaceBetween={50}
            autoplay={true}
            // navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
        >

            {data.map((item, index) => {
                return (

                    <SwiperSlide key={item.id} style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                    >
                        <Link to={{
                            pathname: `${item.id}`
                        }} key={index}
                        >


                            <div className="center" >
                                <h2>{pathname === '/react-movie-database/' ? item.title : item.name}</h2>
                                <p>{item.overview}</p>
                            </div>
                        </Link>
                    </SwiperSlide>

                )
            })}
      ...
        </Swiper>
    )
}

export default Slide;