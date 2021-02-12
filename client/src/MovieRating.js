import React, { useState, useEffect } from 'react';


const MovieRating = props => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const id = props.id;
    const [click, setClick] = useState(false);
    const [starsSelected, setStarsSelected] = useState(0);
    const [token, setToken] = useState('');
    const [ratingText, setRatingText] = useState(false)
    const pathname = window.location.pathname;


    const clickHandler = () => {
        setClick(!click);
    }

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`);
            const token = await response.json()
            setToken(token.guest_session_id)
        };
        fetchToken();
    }, [])




    const submitHandler = async () => {

        setTimeout(() => {
            setRatingText(!ratingText)
            setTimeout(() => {
                setClick(!click);
            }, 2000)
        }, 1000)
    }



    const change = (starsSelected) => {
        setStarsSelected(starsSelected)
    }
    let button;
    if (starsSelected === 0) {
        button = <h3>Rate movie</h3>
    }
    else if (starsSelected < 6) {
        button = <h3>Eh, seen better</h3>
    }
    else if (starsSelected < 9) {
        button = <h3>Great movie</h3>
    }
    else {
        button = <h3>Masterpiece!</h3>
    }

    return (
        <a className="rating">
            <h3 className={click === true ? "rating-btn rating-btn_active" : 'rating-btn'} onClick={clickHandler}>{pathname === `/tv/${id}` ? 'Rate show' : 'Rate Movie'}<i className={click ? "fas fa-star" : "fas fa-star active"}></i></h3>

            <div className={click ? 'rating-container rating-active' : 'rating-container'}>
                {button}
                <div className="stars">
                    {[...Array(props.totalStars)].map((n, i) => (

                        <i
                            key={i}
                            onClick={() => change(i + 1)}
                            className={i < starsSelected ? 'fas fa-star' : 'far fa-star'}
                        ></i>

                    ))}
                </div>

                <button className={ratingText ? 'btn btn-active' : 'btn'} onClick={submitHandler} type="submit">{ratingText ? 'Thanks!' : 'Submit'}</button>
            </div>
        </a>
    )
}

export default MovieRating;

