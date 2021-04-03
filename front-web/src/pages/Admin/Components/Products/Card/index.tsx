import ProductPrice from 'core/components/ProductPrice';
import React from 'react';
import './styles.scss';
import { Product } from 'core/types/Products';
import { Link } from 'react-router-dom';

type Props = {
    product: Product;
    onRemove: (productId:number) => void;
}


const Card = ({product, onRemove}:Props) => {
    return (
        <div className = "card-base product-card-admin">
            <div className="row">
                <div className = "col-2 text-center border-right py-3">
                    <img 
                    src = {product.imgUrl}
                    alt = {product.name}
                    className = "product-card-image-admin"    
                />
                </div>
                <div className = "col-7 py-3">
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
                <div className = "col-3 pt-3 pr-5">
                    <Link 
                        to = {`/admin/products/${product.id}`}
                        type="button" 
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit"
                        >
                            EDITAR
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-outline-danger btn-block border-radius-10 mb-3"
                        onClick = {()=> onRemove(product.id)}
                        >
                            EXCLUIR
                    </button>  
                </div>
            </div>
        </div>
    )    
}

export default Card;