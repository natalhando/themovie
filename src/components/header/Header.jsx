import React from 'react';
import './style.scss'
import popcorn from './assets/popcorn.png'
import info from './assets/info.png'
import dash from './assets/dash.png'

function Header({title, icon}) {
    return (
        <div className="Header">
            <div className="title">
                {(() => {
                    switch(icon) {
                        case 'popcorn': return <img src={popcorn} alt="icon"/>;
                        case 'info': return <img src={info} alt="icon"/>;
                        case 'dash': return <img src={dash} alt="icon"/>;
                        default: return <></>
                    }
                })()}
                <h2>{title}</h2>
            </div>
        </div>
    );
}

export default Header;