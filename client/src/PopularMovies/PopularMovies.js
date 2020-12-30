import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Popular = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [data, setData] = useState([]);
    const tv = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=2`
    const movie = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`;

    const pathname = window.location.pathname;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const getPopularMovies = async () => {
                const response = await fetch(pathname === '/' ? movie : tv);
                const movies = await response.json()
                setData(movies.results)
            };
            getPopularMovies();
        }


        return () => {
            mounted = false;
        }
    }, [pathname, movie, tv])




    return (
        <div className="popular-container">
            <h2>{props.title}</h2>
            <div className="popular-container_movies">
                {data.map((item, index) => {
                    return (
                        <Link to={{
                            pathname: `${pathname}${item.id}`
                        }}
                            key={index}
                            className="popular-container_movies-item"
                        // style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                        >
                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36`} />

                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Popular;