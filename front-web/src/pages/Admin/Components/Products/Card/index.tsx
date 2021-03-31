import React from 'react';
import './styles.scss';

const Card = () => {
    return (
        <div className = "card-base product-card-admin">
            <div className="row">
                <div className = "col-2 text-center border-right py-3">
                    <img src = "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg"
                    alt ="Imagem teste"
                    className = "product-card-image-admin"    
                />
                </div>
                <div className = "col-7 py-3">
                    <h3 className = "product-card-name-admin">
                        Computador i7
                    </h3>
                </div>
                <div className = "col-3 py-3">
                    <h1>Ações</h1>  
                </div>
            </div>
        </div>
    )    
}

export default Card;