import React, { useState, useRef, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Nav from './Nav';
import SearchResults from './SearchResults';
import debounce from 'lodash.debounce';

const Header = ({ authenticated, userData, logoutHandler }) => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const wrapperRef = useRef(null);
    const [watching, setWatching] = useState(false)
    const pathname = window.location.pathname;

    console.log('rerendered')

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

    const history = useHistory();
    const goBack = event => {
        history.goBack()
    }


    const debouncedSave = useCallback(
        debounce(query => fetchData(query), 1000),
        [],
    );

    // Data call
    const fetchData = async query => {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`);
        const movies = await response.json()
        setData(movies.results)
        return;
    };
    // Setting query with setTimeout then fetching data to minimise http requests
    const onChange = async e => {
        const value = e.target.value;
        setQuery(value)
        debouncedSave(query)
    }


    return (
        <div className="header">
            <div style={{
                display: pathname === '/' || pathname === '/tv/'
                    ? 'none'
                    : 'block'
            }}
                onClick={(e) => goBack()}>
                <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i>
            </div>
            <div className="logo">
                <Link to="/">{authenticated ? `Welcome ${userData.data.firstName}` : 'ProShowz'}</Link>
            </div>

            <div className="mobile-nav">
                <i className="fas fa-search" onClick={searchClickHandler}></i>
                <div className="burger-menu" onClick={menuClickHandler}><i className={authenticated ? 'fas fa-user-circle' : 'fas fa-bars'}></i></div>
            </div>

            <div ref={wrapperRef} className={menu ? 'mobile-menu mobile' : 'mobile-menu'}><Nav userData={userData} closeMenu={menuClickHandler} logoutHandler={logoutHandler} /></div>

            <div className={search ? 'show-search search' : 'show-search'} >
                <input ref={wrapperRef} type="search" value={query} onChange={(e) => onChange(e)} placeholder="Search..." />
                <i onClick={fetchData} className="fas fa-arrow-circle-right"></i>
                <SearchResults data={data} closeMenu={searchClickHandler} />
            </div>
            <div className="app-routes">
                <Link to="/" className={watching ? "app-routes_movies app-routes_active" : "app-routes_movies"} onClick={watchClickHandler}>Movies</Link>
                <Link to="/tv/" className="app-routes_tv" onClick={watchClickHandler}>TV</Link>
            </div>

        </div >
    )
}


export default Header;