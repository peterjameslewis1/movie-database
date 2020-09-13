import React, { useState, useEffect } from 'react';


const MovieRating = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const id = props.id;
    const [click, setClick] = useState(false);
    const [starsSelected, setStarsSelected] = useState(0);
    const [token, setToken] = useState('');
    const [ratingText, setRatingText] = useState(false)


    const clickHandler = () => {
        setClick(!click);
    }

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${key}`);
            const token = await response.json()
            console.log(token)
            setToken(token.guest_session_id)
        };
        fetchToken();
    }, [])




    const submitHandler = async () => {
        // const data = {
        //     "value": starsSelected
        // }
        // const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${key}&guest_session_id=${token}`, {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json;charset=utf-8"
        //     },
        //     body: JSON.stringify(data)
        // });
        // const rating = await response.json()
        // console.log(rating)

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
        <div className="rating">
            <h3 className={click === true ? "rating-btn rating-btn_active" : 'rating-btn'} onClick={clickHandler}>Rate this Movie <i className={click ? "fas fa-star" : "fas fa-star active"}></i></h3>

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
        </div>
    )
}

export default MovieRating;

