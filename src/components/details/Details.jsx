import React from 'react';
import './style.scss'

import image from './../../assets/placeholder.jpg'
import Header from './../header/Header'
import { Scrollbars } from 'react-custom-scrollbars';
import { StarFilled } from '@ant-design/icons'

function Details() {
    return (
        <div className="Details">
            <Header
                title="Detalhes"
                icon="info"
            />
            <div className="card-body">
                <img src={image} alt="Movie cover details"/>
                <Scrollbars
                    className="card-content"
                    style={{ height: 160 }}
                >
                    <h3>Nome do Filme</h3>
                    <p>
                        <StarFilled/>
                        4.9
                    </p>
                    <p>
                        Aqui no caso seria a sinopse do filme, bla bla bla, bem curtinha só pra não dizer que não tem.
                    </p>
                    <p>
                        Elenco: Natalia Pinheiro, Lettycia Pinheiro, Guilherme Ferreira.
                    </p>
                    <p>
                        Produção: Edson Arruda
                    </p>
                </Scrollbars>
            </div>
        </div>
    );
}

export default Details;