import React from 'react';
import './style.scss'

import Header from './../header/Header'
import { VictoryPie } from "victory";

function Dashboard() {
    return (
        <div className="Dashboard">
            <Header
                title="Dashboard"
                icon="dash"
            />
            <div className="card-body">
                <div className="card-data">
                    <VictoryPie
                        data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }
                        ]}
                        height={200}
                        innerRadius={100}
                    />
                </div>
                <div className="card-content">
                    <h3>Gêneros mais populares</h3>
                    <div className="label">
                        <div className="color"></div><p>Romance</p>
                    </div>
                    <div className="label">
                        <div className="color"></div><p>Comédia</p>
                    </div>
                    <h4>Ver menos populares</h4>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;