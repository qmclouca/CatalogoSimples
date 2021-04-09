import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Products';
import { makeRequest, makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import { toast } from 'react-toastify';
import CardLoader from './../Loaders/ProductCardLoaders';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';

const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            name: filter?.name,
            categoryId: filter?.categoryId,
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
    }, [activePage]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

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
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <ProductFilters onSearch={filter => getProducts(filter)} />
            </div>
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}
                {productsResponse && (
                    <Pagination
                        totalPages={productsResponse?.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}
export default List;