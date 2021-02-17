import React from 'react';
import './style.scss'

import MovieItem from './../movie-item/MovieItem'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'

class MovieList extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movies: props.movies,
            genres: [],
            movie: 761053
        }
    }

    componentDidMount() {
        this.loadGenres()
    }

    async loadGenres() {
        this.setState({
            genres: (await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.genres
        })
    }

    getGenre = (ids) =>  {
        let genres = []
        for (let id of ids) {
            genres.push(
                this.state.genres.filter(item => item.id === id)[0].name
            )
        }
        return genres
    }

    updateMovie = (movie) => {
        this.props.updateMovie(movie)
    }

    render() {
    
        return (
            <div className="MovieList">
                <Scrollbars style={{ height: 420, renderTrackHorizontal: false }}>
                    {
                        this.props.movies.map(
                            (item, index) => (
                                <MovieItem
                                    place={index + 1}
                                    title={item.title}
                                    rate={item.vote_average}
                                    genres={this.getGenre(item.genre_ids)}
                                    id={item.id}
                                    key={index}
                                    updateMovie={this.updateMovie}
                                />
                            )
                        )
                    }
                </Scrollbars>
            </div>
        );
    }
}

export default MovieList;