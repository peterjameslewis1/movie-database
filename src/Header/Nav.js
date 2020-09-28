import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Nav = (props) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [genre, setGenre] = useState(false);
    const [data, setData] = useState([]);
    const [clicked, setClicked] = useState(false)
    const movieGenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
    const tvGenreUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`
    const pathname = window.location.pathname;


    const getGenres = async () => {
        const response = await fetch(genre ? movieGenreUrl : tvGenreUrl);
        const genres = await response.json()
        setData(genres.genres)
    }


    const genreHandler = () => {
        setGenre(!genre)
        getGenres()
    }
    const clickHandler = () => {
        setClicked(!clicked)
    }



    return (
        <ul className="nav">
            <li className="nav-link"><a href="/react-movie-database/">Home</a><i onClick={props.closeMenu} className="fas fa-times"></i></li>
            <li onClick={() => {
                genreHandler();
                clickHandler();
            }} className="genre-dropdown nav-link">
                {pathname === '/react-movie-database/' ? 'Movie genres' : 'TV genres'}
                <i className={clicked ? 'fas fa-caret-up rotate' : 'fas fa-caret-up'}></i>
            </li>
            <ul className={genre ? 'genres-menu open' : 'genres-menu'}>
                {data.map((genre, index) => {
                    return <Link to={{ pathname: pathname.includes('/tv/') ? `/react-movie-database/tv/genres/${genre.name}` : `/react-movie-database/genres/${genre.name}` }} key={genre.id}>{genre.name}</Link>
                })}
            </ul>
            <li className="nav-link">About</li>
            <li className="nav-link">Contact</li>
        </ul>
    )
}

export default Nav;