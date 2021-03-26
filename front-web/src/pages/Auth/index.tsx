import React from 'react';
import {ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import './styles.scss';
import { Route, Switch } from 'react-router';

const Auth = () => (
    <div className = "auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Divulgue seus produtos <br /> no DS Catalog
            </h1>
            <p className="auth-info-subtitle">
                Faça parte do nosso catálogo de divulgação e <br /> aumente a venda dos seus produtos.
            </p>
            <AuthImage/>
        </div>
        <div className="auth-content">
            <Switch>
                <Route path="/admin/auth/login">
                    <h1>Login</h1>
                </Route>
                <Route path="/admin/auth/register">
                    <h1>Cadastro</h1>
                </Route>
                <Route path="/admin/auth/recover">
                    <h1>Recuperar</h1>
                </Route>
            </Switch>
        </div>
    </div>
);
export default Auth;