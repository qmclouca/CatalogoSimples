import React from 'react';
import './styles.scss';
import {ReactComponent as MainImage } from '../../core/assets/images/main-image.svg'
import ButtonIcon from '../../core/components/ButtonIcon';
import { Link } from 'react-router-dom'

const Home = () => (
    <div className = "home-container">
        <div className="row home-content card-base border-radius-20">
            <div className="col-6 home-text">
                <h1 className="text-title"> 
                    Conheça o melhor <br /> catálogo de produtos
                </h1>
                <p className="text-subtitle">
                  Ajudaremos você a encontrar os melhores <br />
                  produtos do mercado.
                </p>
                <Link to="/catalog">
                    <ButtonIcon text="inicie agora a sua busca" />
                </Link>
            </div>
            <div className="col-6">
                <MainImage className = "main-image" />
            </div>
        </div>
    </div>
);
export default Home;