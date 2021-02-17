import React from 'react';
import './style.scss'

import Movies from './../movies/Movies'
import Details from './../details/Details'
import Dashboard from './../dashboard/Dashboard'

export class Panel extends React.Component {

    constructor(props) {
        super(props)
        this.detailsElement = React.createRef()
    }

    updateMovie = (movie) => {
        this.detailsElement.current.updateMovie(movie)
    }

    render() {
        return (
            <div className="Panel">
                <div className="column">
                    <Movies
                        updateMovie={this.updateMovie}
                    />
                </div>
                <div className="column">
                    <Details
                        ref={this.detailsElement}
                        movie={761053}
                    />
                    <Dashboard/>
                </div>
            </div>
        );     
    }
 
}

