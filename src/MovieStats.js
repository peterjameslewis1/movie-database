import React, { useState } from 'react';



const Stats = (props) => {
    const rating = props.stat;
    const [heartClicked, setHeartClicked] = useState(false)
    const [thumbClicked, setThumbClicked] = useState(false)

    const heartClickHandler = () => {
        setHeartClicked(!heartClicked)
    }
    const thumbClickHandler = () => {
        setThumbClicked(!thumbClicked)
    }

    return (
        <div className="stats">
            <div className="rating">
                <i onClick={thumbClickHandler} className={thumbClicked ? 'active fas fa-thumbs-up' : 'fas fa-thumbs-up'}></i>
                <p>{rating}/10</p>
            </div>
            <div className="favorite">
                <i onClick={heartClickHandler} className={heartClicked ? 'active fas fa-heart' : 'fas fa-heart'}></i>
            </div>
        </div>
    )
}

export default Stats;