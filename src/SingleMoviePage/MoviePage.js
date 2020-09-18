import React, { useEffect, useState } from 'react';
import MovieStats from '../MovieStats';
import Dropdown from '../Dropdown/Dropdown';
import Header from '../Header/Header';
import MovieRating from './MovieRating';

const SingleMovie = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const id = props.match.params.id;
    const [clicked, setClicked] = useState(false)
    const [data, setData] = useState({
        genres: []
    });
    const tvUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US`;
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    const pathname = window.location.pathname;

    console.log(id)
    useEffect(() => {
        window.scrollTo(0, 0)
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const response = await fetch(pathname === `/react-movie-database/${id}` ? movieUrl : tvUrl);
                const movies = await response.json()
                setData(movies)
            };
            fetchData();
        }


        return () => {
            mounted = false;
        }
    }, [pathname]);



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
    console.log(props)


    if (pathname === `/react-movie-database/${id}`) {
        // Mapping over movie genres
        const movieGenres = (
            data.genres.map(item => {
                return <span key={item.id}>{item.name}, </span>
            })
        )
        //
        return (
            <>
                <Header />
                <div className="single-movie" >
                    <h2>{data.title}</h2>
                    <ul className="single-movie_info container">
                        <li className="popularity"><i onClick={clickHandler} className={clicked ? 'pulse-active fas fa-star' : 'fas fa-star'}></i>{parseInt(data.popularity)}</li>
                        {/* <li>{movieGenres}</li> */}
                        {pathname === `/react-movie-database/${id}` ? movieRuntime : tvRuntime}
                        <li>{data.release_date}</li>
                    </ul>
                    <div className="single-movie_img"
                        style={{ background: `url('https://image.tmdb.org/t/p/original${data.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                    >
                    </div>
                    <div className="single-movie_text container">
                        <MovieStats stat={data.vote_average} />
                        <h3>{data.tagline}</h3>
                        <span></span>
                        <p>{data.overview}</p>
                        <MovieRating id={id} totalStars={10} />
                        <Dropdown title="Similar" id={id} />
                    </div>
                </div >
            </>
        )
    }
    else {
        return (
            <>
                <Header />
                <div className="single-movie">
                    <h2>{data.name}</h2>
                    <ul className="single-movie_info container">
                        <li className="popularity"><i onClick={clickHandler} className={clicked ? 'pulse-active fas fa-star' : 'fas fa-star'}></i>{parseInt(data.popularity)}</li>
                        {/* <li>{movieGenres}</li> */}
                        {pathname === `/react-movie-database/${id}` ? movieRuntime : tvRuntime}
                        <li>{data.first_air_date}</li>
                    </ul>
                    <div className="single-movie_img"
                        style={{ background: `url('https://image.tmdb.org/t/p/original${data.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                    >
                    </div>
                    <div className="single-movie_text container">
                        <MovieStats stat={data.vote_average} />
                        <div className="single-movie_text-links">
                            <a href={data.homepage}>Watch here</a>
                            <a href=""></a>
                        </div>
                        <h4>{data.status}</h4>
                        <span></span>
                        <p>{data.overview}</p>
                        <MovieRating id={id} totalStars={10} />
                        <Dropdown title="Similar" id={id} />
                    </div>
                </div >
            </>
        )
    }
}

export default SingleMovie;