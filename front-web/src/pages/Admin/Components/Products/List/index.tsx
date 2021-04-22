import Pagination from 'core/components/Pagination';
import { Category, ProductsResponse } from 'core/types/Products';
import { makeRequest, makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import { toast } from 'react-toastify';
import CardLoader from './../Loaders/ProductCardLoaders';
import ProductFilters from 'core/components/ProductFilters';
import './styles.scss';

const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory(); 
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            name: name,
            categoryId: category?.id,
            direction: 'DESC',
            orderBy: 'id'
        }
        //iniciar o loader
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
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


    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este produto?');
        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Produto excluído com sucesso!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao excluir produto!');
                })
        }
    }

    return (
        <div className="admin-products-list">
            <div className="d-flex justify-content-between filter-mobile">
                <button className="btn btn-filter-mobile btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <ProductFilters 
                 name={name}
                 category={category}
                 handleChangeCategory={handleChangeCategory}
                 handleChangeName={handleChangeName}
                 clearFilters={clearFilters}                
                 />
            </div>
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}
                {productsResponse && (
                    <Pagination
                        totalPages={productsResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}
export default List;