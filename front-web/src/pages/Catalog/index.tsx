import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import './styles.scss';
import { makeRequest } from '../../core/utils/request';
import { ProductsResponse } from '../../core/types/Products';

const Catalog = () => {
    /*quando o componente iniciar, buscar a lista de produtos
    quando a lista de produtos estiver disponível, popular um 
    estado no componente, e listar os produtos dinamicamente
    useEffect é usado para gerenciar o ciclo de vida do objeto e
    o fetch para conectar com o backend
    console.log("componente de listagem iniciado!");
    usar no package.jason a linha "proxy":"http://localhost:8080" 
    (esse é o endereço da API que está sendo criada em Spring)
    para evitar o problema de cors
    o fetch foi substituido por axios para acrescenter funcionalidades*/
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
           
    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }
       
        makeRequest({url: '/products', params})
            .then(response => setProductsResponse(response.data));
    }, []);
    return (
        <div className = "catalog-container">
            <h1 className = "catalog-title">
                Catálogo de produtos
            </h1>
            <div className = "catalog-products">
                    {productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key = {product.id}>
                            <ProductCard product = {product} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
export default Catalog;