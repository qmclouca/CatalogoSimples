import React from 'react';
import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Products';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    product: Product;
    onRemove: (productId:number) => void;
}


const Card = ({product, onRemove}:Props) => {
    return (
        <div className = "card-base product-card-admin">            
                <div className = "text-center border-right py-3">
                    <img 
                    src = {product.imgUrl}
                    alt = {product.name}
                    className = "product-card-image-admin"    
                />
                </div>
                <div className = "card-content">
                    <h3 className = "product-card-name-admin">
                        {product.name}
                    </h3>
                    <ProductPrice price={product.price}/> 
                    <div>
                        <span className ="badge badge-pill badge-secondary mr-2">
                            Categoria 1
                        </span>
                        <span className ="badge badge-pill badge-secondary mr-2">
                            Categoria 2
                        </span>
                        <span className ="badge badge-pill badge-secondary mr-2">
                            Categoria 3
                        </span>
                    </div>
                </div>
                <div className = "buttons-container">
                    <Link 
                        to = {`/admin/products/${product.id}`}
                        type="button" 
                        className="btn btn-outline-secondary btn-block border-radius-10 btn-product"
                        >
                            EDITAR
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 btn-product"
                        onClick = {()=> onRemove(product.id)}
                        >
                            EXCLUIR
                    </button>  
                </div>
            </div>        
    )    
}

export default Card;