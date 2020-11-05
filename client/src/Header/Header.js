import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Nav from './Nav';
import SearchResults from './SearchResults';

const Header = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const wrapperRef = useRef(null);
    const [watching, setWatching] = useState(false)


    // State to open and close menu's
    const menuClickHandler = () => {
        setMenu(!menu)
    }
    const searchClickHandler = () => {
        setSearch(!search)
    }
    const watchClickHandler = () => {
        setWatching(!watching)
    }
    //

    const history = useHistory();
    const goBack = event => {
        history.goBack()
    }

    // Data call
    const fetchData = async () => {
        if (query === '') {
            return;
        }
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`);
        const movies = await response.json()
        setData(movies.results)
    };
    //



    // KeyPress event to fetch data if Enter is hit and query is not enmpty string
    const keyPress = event => {
        if (event.key === "Enter" && query !== '') {
            fetchData()
        }
    }
    //

    const searchBtn = <i className="fas fa-search" onClick={searchClickHandler}></i>
    document.addEventListener('click', (e) => {
        if (search === true) {
            if (e.target === wrapperRef.current) {
                return;
            }
        }
    })

    return (
        <div className="header">
            <div className={
                window.location.pathname === '/react-movie-database/' || window.location.pathname === 'react-movie-database/tv'
                    ? 'hide'
                    : 'show'
            }
                onClick={(e) => goBack()}>
                <i className="fas fa-arrow-left"></i>
            </div>
            <div className="logo">
                <span></span>
                <a href="/react-movie-database/">ProShowz</a>
            </div>

            {/* <nav className="nav">
                <Nav />
            </nav> */}

            <div className="mobile-nav">
                <div className="burger-menu" onClick={menuClickHandler}><i className="fas fa-bars"></i></div>
                {searchBtn}
            </div>

            <div ref={wrapperRef} className={menu ? 'mobile-menu mobile' : 'mobile-menu'}><Nav closeMenu={menuClickHandler} /></div>

            <div className={search ? 'show-search search' : 'show-search'} >
                <input ref={wrapperRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." onKeyPress={keyPress} />                <i onClick={fetchData} className="fas fa-arrow-circle-right"></i>
                <SearchResults data={data} state={menu} />
            </div>
            <div className="app-routes">
                <Link to="/react-movie-database/" className={watching ? "app-routes_movies app-routes_active" : "app-routes_movies"} onClick={watchClickHandler}>Movies</Link>
                <Link to="/react-movie-database/tv/" className="app-routes_tv" onClick={watchClickHandler}>TV</Link>
            </div>
        </div>
    )
}


export default Header;