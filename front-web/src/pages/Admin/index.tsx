import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/index';
import Products from './Components/Products';
import './styles.scss';

const Admin = () => (
    <div className = "admin-container">
       <Navbar />
        <div className = "admin-content">
            <Switch>
                <Route path="/admin/products" exact>
                    <Products />
                </Route>
                <Route path="/admin/categories">
                    <h1>Categories</h1>
                </Route>
                <Route path="/admin/users">
                    <h1>Users</h1>
                </Route>
            </Switch>
        </div>
    </div>
);
export default Admin;