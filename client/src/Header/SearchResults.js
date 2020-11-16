import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ data, closeMenu }) => {
    const pathname = window.location.pathname;

    return (
        <div className="list">
            <ul>
                {data.map(item => {
                    return (
                        <Link to={{ pathname: pathname.includes('/tv/') ? `/tv/${item.id}` : `/${item.id}` }}
                            className="list-item"
                            key={item.id}
                            onClick={closeMenu}
                        >
                            <div className="list-item_img"
                                style={{ background: `url('https://image.tmdb.org/t/p/original${item.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                            ></div>
                            <div className="list-item_text">
                                <h4>{item.title}</h4>
                                <p>{item.release_date}</p>
                            </div>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchResults;