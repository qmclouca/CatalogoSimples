import React from 'react';
import {ReactComponent as ArrowIcon} from 'core/assets/images/arrow.svg'
import './styles.scss';

const Pagination = () => {
    return (
        <div className = "pagination-container">
            <ArrowIcon className = "pagination-previous" />
            <div className = "pagination-item active">
                1
            </div>
            <div className = "pagination-item">
                2
            </div>
            <div className = "pagination-item">
                3
            </div>
            <ArrowIcon className = "pagination-next"/>
        </div>
    )

}
export default Pagination;