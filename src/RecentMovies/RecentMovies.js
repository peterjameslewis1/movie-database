import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieStats from '../MovieStats';


const RecentMovies = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [clicked, setClicked] = useState(false)
    const [data, setData] = useState([])
    const similar = `https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=${key}&language=en-US&page=1`;
    const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`;

    const clickHandler = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        getdropDown()
    }, [])

    async function getdropDown() {
        let response;
        let movies;
        if (props.title === 'Similar') {
            response = await fetch(similar);
        }
        else {
            response = await fetch(upcoming);
        }

        movies = await response.json()
        setData(movies.results)
    }



    return (
        <div className="recent">
            <div className="title">
                <h2>{props.title}</h2>
                <span onClick={clickHandler}><i className="fas fa-caret-up"></i></span>
            </div>
            <div className={clicked ? 'hidden recent-container' : 'recent-container'}>
                <div className="recent-container_items">
                    {data.map((item, index) => {
                        return (
                            <Link to={{
                                pathname: `/${item.id}`
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