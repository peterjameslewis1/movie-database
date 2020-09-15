import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieStats from '../MovieStats';


const RecentMovies = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [clicked, setClicked] = useState(false)
    const [data, setData] = useState([])
    const similarMovie = `https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=${key}&language=en-US&page=1`;
    const similarTv = `https://api.themoviedb.org/3/tv/${props.id}/similar?api_key=${key}&language=en-US&page=1`;
    const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`;
    const tv = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=3`

    const pathname = window.location.pathname;

    const clickHandler = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        getdropDown()
    }, [pathname])

    async function getdropDown() {
        let response;
        let movies;
        if (pathname === `/react-movie-database`) {
            response = await fetch(upcoming);
        }
        else if (pathname === `/react-movie-database/${props.id}`) {
            response = await fetch(similarMovie);
        }
        else if (pathname === `/react-movie-database/tv/${props.id}`) {
            response = await fetch(similarTv);
        }
        else {
            response = await fetch(tv)
        }


        movies = await response.json()
        setData(movies.results)
    }



    return (
        <div className="recent">
            <div className="title">
                <h2>{props.title}</h2>
                <i onClick={clickHandler}
                    className="fas fa-caret-up"></i>
            </div>
            <div className={clicked ? 'hidden recent-container' : 'recent-container'}>
                <div className="recent-container_items">
                    {data.map((item, index) => {
                        return (
                            <Link to={{
                                pathname: `${pathname}/${item.id}`
                            }}
                                className="recent-container_items--item"
                                key={index}>
                                <div className="img"
                                    style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=${key}')` }}
                                ></div>
                                <div className="text">
                                    <h4>{item.title}</h4>
                                    <MovieStats stat={item.vote_average} />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RecentMovies;