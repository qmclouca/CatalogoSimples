import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/Search-icon.svg';
import './styles.scss';
import Select from 'react-select';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Products';

export type FilterForm = {
    name?: string;
    categoryId?: number;
}

type Props = {
    onSearch: (filter: FilterForm)=> void;
}

const ProductFilters = ({ onSearch }:Props) => {
        const [isLoadingCategories, setIsLoadingCategories] = useState(false);
        const [categories, setCategories] = useState<Category[]>([]);
        const [name, setName] = useState('');

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: `/categories` })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    const handleChangeName = (name: string) => {
        setName(name);
        onSearch({name});
    }

    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Pesquisar produto"
                    onChange = {event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                inputId="categories"
                placeholder="Categorias"
            />
            <button
                className="btn btn-outline-secondary border-radius-10"
            >
              LIMPAR FILTRO
            </button>
        </div>
    )
}
export default ProductFilters;
