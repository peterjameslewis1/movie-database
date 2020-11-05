import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MovieStats from '../MovieStats';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import '../App.css';
// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Slider2 = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [data, setData] = useState([]);
    const tv = `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`
    const movie = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`

    const pathname = window.location.pathname;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            async function getNewReleases() {
                const response = await fetch(pathname === '/react-movie-database/' ? movie : tv);
                const movies = await response.json()
                setData(movies.results)
            }
            getNewReleases()
        }

        return () => {
            mounted = false;
        }
    }, [pathname, movie, tv])


    return (
        <>
            <h2>{props.title}</h2>
            <Swiper
                spaceBetween={50}
                autoplay={true}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >

                {data.map((item, index) => {
                    return (
                        <SwiperSlide key={index}
                            style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                            key={index}
                        >
                            <Link to={{
                                pathname: `${pathname}${item.id}`
                            }}>

                                <div className="center">
                                    <h2>{pathname === '/react-movie-database/' ? item.title : item.name}</h2>
                                    <p>{item.overview}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}

export default Slider2;