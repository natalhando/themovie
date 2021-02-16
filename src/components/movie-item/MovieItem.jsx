import React from 'react';
import './style.scss'

import { StarFilled } from '@ant-design/icons'
import image from './../../assets/placeholder.jpg'

function MovieItem({
    place,
    title,
    rate,
    tag
}) {
    return (
        <div className="MovieItem">
            <div className="card-body">
                <div className="card-header">
                    <div>
                        <h3>{place}º {title}</h3>
                    </div>
                    <p>
                        <StarFilled />
                        {rate}
                    </p>
                </div>
                <div className="tags">
                    <div className="tag"><p>{tag}</p></div>
                </div>
            </div>
        </div>
    );
}

export default MovieItem;