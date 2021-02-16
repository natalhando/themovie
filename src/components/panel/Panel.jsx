import React from 'react';
import './style.scss'

import Movies from './../movies/Movies'
import Details from './../details/Details'
import Dashboard from './../dashboard/Dashboard'
import { Row, Col } from 'antd';

function Panel() {
    return (
        <div className="Panel">
                <div className="column">
                    <Movies/>
                </div>
                <div className="column">
                    <Details/>
                    <Dashboard/>
                </div>
        </div>
    );
}

export default Panel;