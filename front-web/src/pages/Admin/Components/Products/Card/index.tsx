import ProductPrice from 'core/components/ProductPrice';
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
                    <ProductPrice price={40.50}/> 
                    <div>
                        <span className ="badge badge-pill badge-secondary mr-2">Categoria 1</span>
                        <span className ="badge badge-pill badge-secondary mr-2">Categoria 2</span>
                        <span className ="badge badge-pill badge-secondary mr-2">Categoria 3</span>
                    </div>
                </div>
                <div className = "col-3 pt-3 pr-5">
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit"
                        >
                            EDITAR
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 mb-3"
                        >
                            EXCLUIR
                    </button>  
                </div>
            </div>
        </div>
    )    
}

export default Card;