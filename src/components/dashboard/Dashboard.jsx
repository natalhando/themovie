import React from 'react';
import './style.scss'

import Header from './../header/Header'
import { VictoryChart, VictoryBar } from "victory"
import axios from 'axios'

export default class Dashboard extends React.Component {

    genres = {
        "28": "Ação",
        "12": "Aventura",
        "16": "Animação",
        "35": "Comédia",
        "80": "Crime",
        "99": "Documentário",
        "18": "Drama",
        "10751": "Família",
        "14": "Fantasia",
        "36": "História",
        "27": "Terror",
        "10402": "Música",
        "9648": "Mistério",
        "10749": "Romance",
        "878": "Ficção científica",
        "10770": "Cinema TV",
        "53": "Thriller",
        "10752": "Guerra",
        "37": "Faroeste"
    }

    constructor(props) {
        super(props)
        this.state = {
            showingMostPopular: true,
            movies: [],
            data: []
        }
        this.loadData()
    }
    
    async loadData() {
        try {
            this.setState({
                movies: (await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.results
            })
        

            for (let i = 2; i <= 5; i++) {
                this.setState({
                    movies: this.state.movies.concat((await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${i}&api_key=${process.env.REACT_APP_API_KEY_TMDB}`)).data.results)
                })
            }
            this.loadGenres()
        } catch(_) {
            this.setState({
                snackbarOpen: true
            })
        } 
    }

    loadGenres() {
        let array = this.state.movies.map(item => item.genre_ids)
        let flatArray = [].concat.apply([], array)
        let genresData = this.numberOfOccurrences(flatArray)
        genresData[0] = genresData[0].map((item) => this.genres[item])
        this.getData(genresData)
    }

    numberOfOccurrences = (array) => {
        var arr = [],
            count = [],
            prev;
      
        array.sort();
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== prev) {
                arr.push(array[i]);
                count.push(1);
            } else {
                count[count.length - 1]++;
            }
            prev = array[i];
        }
      
        return [arr, count];
    }

    getData = (array) => {
        let data = []
        for (let i = 0; i < array[0].length; i++) {
            data.push({
                x: (array[0])[i],
                y: (array[1])[i]
            })
        }
        data = data.sort((a, b) => (a.y > b.y) ? 1 : -1)

        this.setState({
            data: data
        })
    }

    changeDashboard = () => {
        this.setState({
            showingMostPopular: !this.state.showingMostPopular
        })
    }

    render() {

        return (
            <div className="Dashboard">
                <Header
                    title={ this.state.showingMostPopular ? "Mais Populares" : "Menos Populares"}
                    icon="dash"
                    isDashboard={true}
                    update={this.changeDashboard}
                />
                <div className="card-body">
                    <div className="card-data">
                    {
                        (this.state.showingMostPopular) ? (
                            <VictoryChart
                                domainPadding={25}
                            >
                                <VictoryBar 
                                    data={this.state.data.slice(this.state.data.length - 1 - 5, this.state.data.length - 1)}
                                    barRatio={1}
                                    animate={{
                                        duration: 2000,
                                        onLoad: { duration: 1000 }
                                    }}
                                    style={{
                                        data: { fill: '#7ec7f1' }
                                    }}
                                />
                            </VictoryChart>
                        ) : (
                            <VictoryChart
                                domainPadding={25}
                            >
                                <VictoryBar 
                                    data={this.state.data.slice(0, 5)}
                                    barRatio={1}
                                    animate={{
                                        duration: 2000,
                                        onLoad: { duration: 1000 }
                                    }}
                                    style={{
                                        data: { fill: '#7ec7f1' }
                                    }}
                                />
                            </VictoryChart>
                        )
                    }
                    <p
                        onClick={this.changeDashboard.bind(this)}
                    >Ver { this.state.showingMostPopular ? 'menos' : 'mais'} populares</p>   
                    </div>
                </div>
            </div>
        );
    }
    
}