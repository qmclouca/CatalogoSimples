import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Products';
import ProductCardLoader from './Components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';

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
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: filter?.name,
            categoryId: filter?.categoryId            
        }
        //iniciar o loader
    setIsLoading(true);
    makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(()=>{
            //finalizar o loader
            setIsLoading(false);
        })
    }, [activePage]);

    useEffect(() => {
       getProducts();
    }, [getProducts]);
    return (
        <div className = "catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className = "catalog-title">
                    Catálogo de produtos
                </h1>
                <ProductFilters onSearch={filter => getProducts(filter)}/>
            </div>
            
            <div className = "catalog-products">
                    {isLoading ? <ProductCardLoader /> : (
                        productsResponse?.content.map(product => (
                            <Link to={`/products/${product.id}`} key = {product.id}>
                                <ProductCard product = {product} />
                            </Link>
                        ))
                    )}              
            </div>
            {productsResponse && (
                <Pagination 
                    totalPages = {productsResponse?.totalPages} 
                    activePage = {activePage}
                    onChange = {page => setActivePage(page)}
                />
            
            )}
        </div>
    );
}
export default Catalog;