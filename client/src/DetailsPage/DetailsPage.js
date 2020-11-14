import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MovieStats from '../MovieStats';
import Dropdown from '../Dropdown/Dropdown';
import MovieRating from '../MovieRating';

const SingleMovie = (props) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const id = props.match.params.id;
    const [clicked, setClicked] = useState(false)
    const [data, setData] = useState({
        genres: [],
        seasons: []
    });
    const tvUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US&`;
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    const pathname = window.location.pathname;

    useEffect(() => {
        window.scrollTo(0, 0)
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const response = await fetch(pathname === `/${id}` ? movieUrl : tvUrl);
                const movies = await response.json()
                setData(movies)
            };
            fetchData();
        }
        return () => {
            mounted = false;
        }
    }, [pathname, id]);







    // Converting movie runtime from minutes into hours & minutes
    const movieRuntime = (
        <li>{Math.floor(data.runtime / 60)}h {data.runtime % 60}mins</li>
    )
    const tvRuntime = (
        <li>{data.episode_run_time}mins</li>
    )
    //

    // onClick for popularity star
    const clickHandler = () => {
        setClicked(!clicked)
    }
    //
    // Mapping over movie genres
    const movieGenres = (
        data.genres.map(item => {
            return <Link to={{ pathname: pathname.includes('/tv/') ? `/tv/genres/${item.name}` : `/genres/${item.name}` }} key={item.id}>{item.name}, </Link>
        })
    )
    //
    console.log(data)

    if (pathname === `/${id}`) {
        return (
            <>

                <div className="single-movie" >
                    <h2>{data.title}</h2>
                    <ul className="single-movie_info container">
                        <li className="popularity"><i onClick={clickHandler} className={clicked ? 'pulse-active fas fa-star' : 'fas fa-star'}></i>{parseInt(data.popularity)}</li>
                        <li>{movieGenres}</li>
                        {pathname === `/${id}` ? movieRuntime : tvRuntime}
                        <li>{data.release_date}</li>
                    </ul>
                    <div className="single-movie_img"
                        style={{ background: `url('https://image.tmdb.org/t/p/original${data.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                    >
                    </div>
                    <div className="single-movie_text container">
                        <MovieStats stat={data.vote_average} />
                        <h3>{data.tagline}</h3>
                        <p>{data.overview}</p>

                        <div className="single-movie_text-links">
                            <a className="watch-now" href={data.homepage} target="_blank">Watch Now</a>
                            <MovieRating id={id} totalStars={10} />
                        </div>
                        <Dropdown title="Similar" id={id} />
                    </div>
                </div >
            </>
        )
    }
    else {
        return (
            <>
                <div className="single-movie">
                    <h2>{data.name}</h2>
                    <ul className="single-movie_info container">
                        <li className="popularity"><i onClick={clickHandler} className={clicked ? 'pulse-active fas fa-star' : 'fas fa-star'}></i>{parseInt(data.popularity)}</li>
                        <li>{movieGenres}</li>
                        {pathname === `/tv/${id}` ? movieRuntime : tvRuntime}
                        <li>{data.first_air_date}</li>
                    </ul>
                    <div className="single-movie_img"
                        style={{ background: `url('https://image.tmdb.org/t/p/original${data.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                    >
                    </div>
                    <div className="single-movie_text container">
                        <MovieStats stat={data.vote_average} />
                        <div className="single-movie_text-links">
                            <a className="watch-now" href={data.homepage} target="_blank">Watch Now</a>
                            <MovieRating id={id} totalStars={10} />
                        </div>
                        <p>{data.overview}</p>
                        <div className="single-movie_text-links">
                            {data.seasons.map((season, index) => {
                                return <Link to={{
                                    pathname: pathname.includes('/tv/')
                                        ? `/tv/season/episode/${season.season_number}`
                                        : `/season/episode/${season.season_number}`,
                                    state: { id: data.id, seasonNumber: season.season_number }
                                }}
                                    value={season.season_number}>
                                    Season {season.season_number === 0 ? 'Specials' : season.season_number}
                                </Link>
                            })}
                        </div>
                        <Dropdown title="Similar" id={id} />
                    </div>
                </div >
            </>
        )
    }
}

export default SingleMovie;