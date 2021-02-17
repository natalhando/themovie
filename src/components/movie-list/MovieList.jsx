import React from 'react';
import './style.scss'

import MovieItem from './../movie-item/MovieItem'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'

class MovieList extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movies: props.movies,
            genres: [],
            movie: 761053,
            snackbarOpen: false
        }
    }

    componentDidMount() {
        this.loadGenres()
    }

    handleCloseSnackbar() {
        this.setState({
            snackbarOpen: false
        })
    }

    async loadGenres() {
        try {
            this.setState({
                genres: (await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.genres
            })
        } catch(_) {
            this.setState({
                snackbarOpen: true
            })
        } 
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnackbar}
                    message="Verifique sua conexão, por favor"
                />
            </div>
        );
    }
}

export default MovieList;