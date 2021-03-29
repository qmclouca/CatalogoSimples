import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonIcon from 'core/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    //cria um estado has Error
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data:FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.push('/admin')
            })
            .catch(() => {
                setHasError(true);
            });
        //chamar a API de autenticação
    }

    return(
        <AuthCard title="login">
            {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos!
                </div>
            )}
           
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
               <div className="margin-bottom-30">
                    <input 
                     type="email"
                     //usando um if dentro do class name com template string. A classe is-invalid só será usada se existir um errors.username 
                     className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
                     placeholder="Email"
                     name="username"
                     ref={register({ 
                         required: "Campo obrigatório",
                         pattern: {
                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                             message: "Email inválido"},
                         minLength: 5
                            }
                     )}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}
                        </div>
                    )}
                </div>

                <div className="margin-bottom-30">
                    <input 
                     type="password" 
                     className="form-control input-base"
                     placeholder="Senha"
                     name="password"
                     ref={register({ 
                        required: "Campo obrigatório",
                        minLength: 5})}
                    />
                    {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <Link to="/admin/auth/recover" className="login-link-recover">Recuperar a senha!</Link>
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>
                <div className="text-center">
                    <span className="not-registered">
                        Não possui cadastro?
                    </span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </AuthCard>
    )
}

export default Login;