import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Results = props => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [data, setData] = useState([]);
    const query = props.title;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    const pathname = window.location.pathname;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            async function getGenreResults() {
                const response = await fetch(pathname.includes('/tv/') ? tvUrl : movieUrl);
                const movies = await response.json()
                setData(movies.results)
            }
            getGenreResults()
        }

        return () => {
            mounted = false;
        }
    }, [pathname, query])

    return (
        <div className="results">
            <h2>{props.title}</h2>
            <div className="results-container">
                {data.map(item => {
                    return (
                        <Link to={{ pathname: pathname.includes('/tv/') ? `/tv/${item.id}` : `/${item.id}` }} className="results-container_item"
                            key={item.id}
                        >
                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}?api_key=${API_KEY}`} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Results;

