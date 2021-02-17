import React from 'react';
import './style.scss'

import { StarFilled } from '@ant-design/icons'

function MovieItem({
    place, title, rate, genres, id, updateMovie
}) {
    
    return (
        <div className="MovieItem" onClick={() => updateMovie(id)}>
            <div className="card-body">
                <div className="card-header">
                    <div>
                        <h3>{ place }º { title }</h3>
                    </div>
                    <p>
                        <span><StarFilled/></span>
                        { rate }
                    </p>
                </div>
                <div className="tags">
                    {
                        genres.map((tag, index) => (
                            <div className="tag" key={index}>
                                <p>{ tag }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default MovieItem;