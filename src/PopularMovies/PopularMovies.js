import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Popular = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [data, setData] = useState([]);

    useEffect(() => {
        getPopularMovies()
    }, [])

    async function getPopularMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`);
        const movies = await response.json()
        setData(movies.results)
    }


    return (
        <div className="popular-container">
            <h2>{props.title}</h2>
            <div className="popular-container_movies">
                {data.map((item, index) => {
                    return (
                        <Link to={{
                            pathname: `/${item.id}`
                        }}
                            key={index}
                            className="popular-container_movies-item"
                            style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                        >

                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Popular;