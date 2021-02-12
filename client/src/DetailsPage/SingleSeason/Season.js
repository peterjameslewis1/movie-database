import React, { useState, useEffect } from 'react';
import EpisodeBlock from '../Episode/EpisodeBlock';

const Season = props => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [data, setData] = useState({
        episodes: []
    });
    const id = props.location.state.id;
    const seasonNumber = props.location.state.seasonNumber;
    const seasonsUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;


    useEffect(() => {
        window.scrollTo(0, 0)
        let mounted = true;
        if (mounted) {
            const fetchSeasons = async () => {
                const response = await fetch(seasonsUrl);
                const seasons = await response.json()
                setData(seasons)
            };
            fetchSeasons();
        }
        return () => {
            mounted = false;
        }
    }, [])

    return <EpisodeBlock key={data.id} data={data} />
}


export default Season;