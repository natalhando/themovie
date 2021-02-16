import React from 'react';
import './style.scss'

import MovieItem from './../movie-item/MovieItem'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'

class MovieList extends React.Component {
    

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            genres: []
        }
    }

    async componentDidMount() {
        this.setState({
            movies: (await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.results
        })
    }

    async loadGenres() {
        let rawGenres = (await axios.get(`themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.results

        rawGenres.genres.map(item => {
            // this.state.genres.push({ item.id: item.name })
        })
    }

    render() {
    
        return (
            <div className="MovieList">
                <Scrollbars style={{ height: 430 }}>
                    {
                        this.state.movies.map(
                            (item, index) => true && (
                                <MovieItem
                                    place={index + 1}
                                    title={item.title}
                                    rate={item.vote_average}
                                    tag="Romance"
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