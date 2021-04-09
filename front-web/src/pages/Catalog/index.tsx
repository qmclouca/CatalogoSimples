import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { Category, ProductsResponse } from 'core/types/Products';
import ProductCardLoader from './Components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';

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
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: name,
            categoryId: category?.id            
        }
        //iniciar o loader
    setIsLoading(true);
    makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(()=>{
            //finalizar o loader
            setIsLoading(false);
        })
    }, [activePage, name, category]);

    
    useEffect(() => {
       getProducts();
    }, [getProducts]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);        
    }

    const handleChangeCategory = (category: Category) => {
        setActivePage(0);
        setCategory(category);       
    }

    const clearFilters = () => {
        setActivePage(0);
        setCategory(undefined);
        setName('');       
    }
    
    return (
        <div className = "catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className = "catalog-title">
                    Catálogo de produtos
                </h1>
                <ProductFilters 
                    name={name}
                    category={category}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
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