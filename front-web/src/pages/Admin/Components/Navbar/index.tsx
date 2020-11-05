import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
        <nav className="admin-nav-container">
            <ul>
                <li>
                    <NavLink to="/admin/products" className = "admin-nav-item">Meus produtos</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/categories" className = "admin-nav-item">Minhas Categorias</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users" className = "admin-nav-item">Meus Usuários</NavLink>
                </li>
            </ul>
        </nav>
    );

export default Navbar;