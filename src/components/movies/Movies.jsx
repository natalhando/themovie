import React from 'react';
import './style.scss'

import Header from './../header/Header'
import MovieList from './../movie-list/MovieList'

function Movies() {
    return (
        <div className="Movies">
            <Header
                title="Mais Populares"
                icon="popcorn"
            />
            <MovieList/>
        </div>
    );
}

export default Movies;