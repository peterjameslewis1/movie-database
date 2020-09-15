import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-animated-slider';




const Slide = (props) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [data, setData] = useState([])
    const tv = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
    const movie = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`

    const pathname = window.location.pathname;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            async function getSliderMovies() {
                const response = await fetch(pathname === '/react-movie-database' ? movie : tv);
                const movies = await response.json()
                setData(movies.results)
            }
            getSliderMovies()
        }

        return () => {
            mounted = false;
        }
    }, [pathname])
    console.log(pathname)

    return (
        <Slider autoplay={4000}
            minSwipeOffset="15px"
            touchDisabled="false"
        >
            {data.map((item, index) => {
                return (
                    <Link to={{
                        pathname: `${pathname}/${item.id}`
                    }} key={index}>

                        <div
                            key={index}
                            id="slide-container"
                            style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                        ></div>
                        <div className="center">
                            <h1>{pathname === '/react-movie-database' ? item.title : item.name}</h1>
                            <p>{item.overview}</p>
                        </div>
                    </Link>
                )
            })}
        </Slider>
    )
}

export default Slide;