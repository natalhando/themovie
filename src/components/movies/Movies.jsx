import React from 'react';
import './style.scss'

import Header from './../header/Header'
import MovieList from './../movie-list/MovieList'

function Movies(props) {

    const updateMovie = (movie) => props.updateMovie(movie)

    return (
        <div className="Movies">
            <Header
                title="Mais Populares"
                icon="popcorn"
            />
            <MovieList
                updateMovie={updateMovie}
            />
        </div>
    );
}

export default Movies;