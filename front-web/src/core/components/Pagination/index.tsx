import React from 'react';
import {ReactComponent as ArrowIcon} from 'core/assets/images/arrow.svg'
import './styles.scss';
import { generateList } from 'core/utils/list';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({totalPages, activePage, onChange}: Props) => {
    const items = generateList(totalPages);

    return (
        <div className = "pagination-container">
            <ArrowIcon className = "pagination-previous" />
            {items.map(item => (
                <div
                    key = {item}
                    className = {`pagination-item ${item === activePage ? 'active' : ''}`}
                    onClick = {() => onChange(item)}
                >
                    {item + 1}
                </div>        
            ))}
                <ArrowIcon className = "pagination-next"/>
        </div>
    )

}
export default Pagination;