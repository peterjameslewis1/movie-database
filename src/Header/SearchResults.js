import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = props => {
    const data = props.data;
    const pathname = window.location.pathname;




    return (
        <div className="list">
            <ul>
                {data.map((item, index) => {
                    return (
                        <Link to={{
                            pathname: `${pathname}${item.id}`
                        }}
                            className="list-item"
                            key={index}
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