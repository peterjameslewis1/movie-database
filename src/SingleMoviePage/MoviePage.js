import React, { useEffect, useState } from 'react';
import MovieStats from '../MovieStats';
import RecentMovies from '../RecentMovies/RecentMovies';
import Header from '../Header/Header';
import MovieRating from './MovieRating';

const SingleMovie = props => {
    const key = '8672037f7713f0f454d73f60ab645f36';
    const id = props.match.params.id;
    const [clicked, setClicked] = useState(false)
    const [movie, setMovie] = useState({
        genres: []
    });

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
                const movies = await response.json()
                setMovie(movies)
            };
            fetchData();
        }


        return () => {
            mounted = false;
        }
    }, [id]);


    // Mapping over movie genres
    const genres = (
        movie.genres.map(data => {
            return <span key={data.id}>{data.name}, </span>
        })
    )
    //

    // Converting movie runtime from minutes into hours & minutes
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const runtime = <li>{hours}h {minutes}mins</li>
    //

    // onClick for popularity star
    const clickHandler = () => {
        setClicked(!clicked)
    }
    //


    return (
        <>
            <Header />
            <div className="single-movie">
                <h2>{movie.title}</h2>
                <ul className="single-movie_info container">
                    <li className="popularity"><i onClick={clickHandler} className={clicked ? 'pulse-active fas fa-star' : 'fas fa-star'}></i>{parseInt(movie.popularity)}</li>
                    <li>{genres}</li>
                    {runtime}
                    <li>{movie.release_date}</li>
                </ul>
                <div className="single-movie_img"
                    style={{ background: `url('https://image.tmdb.org/t/p/original${movie.poster_path}?api_key=8672037f7713f0f454d73f60ab645f36')` }}
                >
                </div>
                <div className="single-movie_text container">
                    <MovieStats stat={movie.vote_average} />
                    <h3>{movie.tagline}</h3>
                    <span></span>
                    <p>{movie.overview}</p>
                    <MovieRating id={id} totalStars={10} />
                    <RecentMovies title="Similar" id={id} />
                </div>
            </div >
        </>
    )
}

export default SingleMovie;