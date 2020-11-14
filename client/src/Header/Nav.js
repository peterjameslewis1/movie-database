import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../auth/SignOut'


const Nav = ({ userData, closeMenu }) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [genre, setGenre] = useState(false);
    const [data, setData] = useState([]);
    const movieGenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
    const tvGenreUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`
    const pathname = window.location.pathname;


    const getGenres = async e => {
        const response = await fetch(genre ? movieGenreUrl : tvGenreUrl);
        const genres = await response.json()
        setData(genres.genres)
    }

    const genreHandler = () => {
        setGenre(!genre)
        getGenres()
    }


    return (
        <ul className="nav">
            <li className="nav-link"><Link to="/">Home</Link><i onClick={closeMenu} className="fas fa-times"></i></li>
            {userData.status === 200
                ? <SignOut userData={userData} />
                :
                <li className="nav-link"><Link to="/api/account">Log in</Link></li>
            }
            <li className="nav-link"><Link to="/api/account">Register</Link></li>
            <li onClick={(e) => {
                e.preventDefault();
                genreHandler();
            }} className="genre-dropdown nav-link">
                {pathname === '/' ? 'Movie genres' : 'TV genres'}
                <i className={genre ? 'fas fa-caret-up rotate' : 'fas fa-caret-up'}></i>
            </li>
            <ul className={genre ? 'genres-menu open' : 'genres-menu'}>
                {data.map(genres => {
                    return <Link to={{ pathname: pathname.includes('/tv/') ? `/tv/genres/${genres.name}` : `/genres/${genres.name}` }} key={genres.id}>{genres.name}</Link>
                })}
            </ul>
        </ul>
    )
}

export default Nav;