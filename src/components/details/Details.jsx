import React from 'react';
import './style.scss'

import Header from './../header/Header'
import { Scrollbars } from 'react-custom-scrollbars';
import { StarFilled } from '@ant-design/icons'
import axios from 'axios'
import Rating from '@material-ui/lab/Rating';

export default class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movie: props.movie,
            movieData: {},
            cast: [],
            crew: [],
            rate: 2.5,
            sessionId: props.sessionId
        }

    }

    componentDidMount() {
        this.updateMovieInfo(this.state.movie)
    }

    updateMovie = (id) => {
        this.setState({
            movie: id
        }, function () {
            this.updateMovieInfo(this.state.movie)
        })
    }

    async updateMovieInfo(id) {
        this.setState({
            movieData: (await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR&page=1&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data
        }, function () {
            this.getCast(this.state.movie)
        }) 
    }

    async getCast(id) {
        let data = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR&page=1&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data
        this.setState({
            cast: data.cast.slice(0, 5),
            crew: data.crew.filter(person => person.department === "Production")
        })
    }

    async handleRate (value) {
        this.setState({
            rate: value
        })

        await axios.post(`https://api.themoviedb.org/3/movie/${this.state.movie}/rating?api_key=${process.env.REACT_APP_API_KEY_TMDB}&guest_session_id=${this.state.sessionId}`, {
            value: 10
        }).then((response) => console.log(response))
    }

    render() {
        return (
            <div className="Details">
                <Header
                    title="Detalhes"
                    icon="info"
                />
                <div className="card-body">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${this.state.movieData.poster_path}`}
                        alt="Movie cover details"
                    />
                    <Scrollbars
                        className="card-content"
                        style={{ height: 160 }}
                    >
                        <h3>{ this.state.movieData.title }</h3>
                        <p>
                            <span><StarFilled/></span>
                            { this.state.movieData.vote_average }
                        </p>
                        <p className="text">Deixe sua avaliação</p>
                        <Rating
                            name="customized-10"
                            precision={0.5}
                            size="small"
                            defaultValue={this.state.rate}
                            max={10}
                            onChange={(_, value) => this.handleRate(value)}
                        />


                        <p className="text">
                            { this.state.movieData.overview }
                        </p>
                        {
                            this.state.cast.length > 0 && (
                                <p className="text">
                                    <span>Elenco:</span> {
                                        this.state.cast.map((person, index) => (
                                            <span
                                                key={index}
                                                className="cast-name"
                                            >
                                                { person.name };{" "}
                                            </span>
                                        ))
                                    }
                                </p>
                            )
                        }
                        
                        {
                            this.state.crew.length > 0 && (
                                <p className="text">
                                    <span>Produção:</span> {
                                        this.state.crew.map((person, index) => (
                                            <span
                                                key={index}
                                                className="cast-name"
                                            >
                                                { person.name };{" "}
                                            </span>
                                        ))
                                    }
                                </p>
                            )
                        }
                        
                    </Scrollbars>
                </div>
                
            </div>
        );
    }

    
}