import React from 'react';
import { ReactComponent as SearchIcon} from 'core/assets/images/Search-icon.svg';
import './styles.scss';
const ProductFilters = () => {
    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar produto"
                    />
                <SearchIcon/>
            </div>
        </div>
    )
}
export default ProductFilters;
