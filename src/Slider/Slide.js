import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const Slide = (props) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [data, setData] = useState([])

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            async function getSliderMovies() {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
                const movies = await response.json()
                setData(movies.results)
            }
            getSliderMovies()
        }

        return () => {
            mounted = false;
        }
    }, [])



    return (
        <Slider autoplay={4000}>
            {data.map((item, index) => {
                return (
                    <Link to={{
                        pathname: `/${item.id}`
                    }} key={index}>

                        <div
                            key={index}
                            id="slide-container"
                            style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                        ></div>
                        <div className="center">
                            <h1>{item.title}</h1>
                            <p>{item.overview}</p>
                            {/* <button>{item.button}</button> */}
                        </div>

                    </Link>
                )
            })}
        </Slider>
    )
}

export default Slide;