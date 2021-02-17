import React from 'react';
import './style.scss'

import Movies from './../movies/Movies'
import Details from './../details/Details'
import Dashboard from './../dashboard/Dashboard'
import axios from 'axios'

export class Panel extends React.Component {

    sessionId = ""

    constructor(props) {
        super(props)
        this.detailsElement = React.createRef()
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        this.createGuestSession()
        this.loadMovies()
    }

    async createGuestSession() {
        this.sessionId = (await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.guest_session_id
    }

    updateMovie = (movie) => {
        this.detailsElement.current.updateMovie(movie)
    }

    async loadMovies() {
        this.setState({
            movies: (await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.results
        })
        

        for (let i = 2; i <= 5; i++) {
            this.setState({
                movies: this.state.movies.concat((await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${i}&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.results)
            })
        }
    }

    render() {
        return (
            <div className="Panel">
                <div className="column">
                    <Movies
                        updateMovie={this.updateMovie}
                        movies={this.state.movies}
                    />
                </div>
                <div className="column">
                    <Details
                        ref={this.detailsElement}
                        movie={761053}
                        sessionId={this.sessionId}
                    />
                    <Dashboard
                        movies={this.state.movies}
                    />
                </div>
            </div>
        );     
    }
 
}

