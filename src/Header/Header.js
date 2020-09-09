import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Nav from './Nav';
import SearchResults from './SearchResults';

const Header = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])

    // State to open and close menu's
    const menuClickHandler = () => {
        setMenu(!menu)
    }
    const searchClickHandler = () => {
        setSearch(!search)
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
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`);
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


    return (
        <div className="header">
            <div className={window.location.pathname !== '/react-movie-database' ? 'show' : 'hide'}
                onClick={(e) => goBack()}>
                <i className="fas fa-arrow-left"></i>
            </div>
            <div className="logo">
                <span></span>
                <a href="/react-movie-database">ProShowz</a>
            </div>

            <nav className="nav">
                <Nav />
            </nav>

            <div className="mobile-nav">
                <div className="burger-menu" onClick={menuClickHandler}><i className="fas fa-bars"></i></div>
                <div className="search-icon" onClick={searchClickHandler}><i className="fas fa-search"></i></div>
            </div>

            <div className={menu ? 'mobile-menu mobile' : 'mobile-menu'}><Nav /></div>

            <div className={search ? 'show-search search' : 'show-search'} >
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." onKeyPress={keyPress} />
                <i onClick={fetchData} className="fas fa-arrow-circle-right"></i>
                <SearchResults data={data} state={menu} />
            </div>
        </div>
    )
}


export default Header;