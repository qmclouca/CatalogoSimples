import React from 'react';
import AuthCard from '../Card';
import './styles.scss';

const Login = () => {
    return(
        <AuthCard title="login">
            <form className="login-form">
                <h1> Formulário de login</h1>
            </form>
        </AuthCard>

    )
}

export default Login;