import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import MovieStats from '../MovieStats';

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
        <div className="new-releases-container">
            <h2>{props.title}</h2>
            <div className="new-releases-container_movies">

                <Slider autoplay={4000}>
                    {data.map((item, index) => {
                        return (
                            <Link to={{
                                pathname: `${pathname}${item.id}`
                            }} key={index}>
                                <div
                                    key={index}
                                    id="slide-container"
                                    style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=${key}')` }}
                                >
                                </div>
                                <div className="description">
                                    <h2>{item.title}</h2>
                                    <MovieStats stat={item.vote_average} />
                                    <p>{item.overview}</p>
                                    <button id="btn">Watch now</button>
                                </div>
                            </Link>
                        )
                    })}
                </Slider>


            </div>
        </div>
    )
}

export default Slider2;