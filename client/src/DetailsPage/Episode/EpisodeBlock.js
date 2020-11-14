import React from 'react';
import Header from '../../Header/Header';

const Episode = props => {
    const data = props.data;

    return (
        <>
            <div className="season-block">
                <h2>{data.name}</h2>
                {data.episodes.map(episode => {
                    return (
                        <div className="season-block-container" key={episode.id}>
                            <div className="season-block-container_episode">
                                <h3>Episode: {episode.episode_number}</h3>
                                <div className="season-block-container_episode-img"
                                    style={{ background: `url('https://image.tmdb.org/t/p/original${episode.still_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                                ></div>
                                <div className="season-block-container_episode-text">
                                    <h3>{episode.name}</h3>
                                    <p>{episode.overview}</p>
                                    <p>Air Date: {episode.air_date}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default Episode;