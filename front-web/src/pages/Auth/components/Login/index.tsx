import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonIcon from 'core/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    email: string;
    password: string;
}



const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data:FormData) => {
        console.log(data);
        //chamar a API de autenticação
    }

    return(
        <AuthCard title="login">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
               <input 
                 type="email" 
                 className="form-control input-base margin-bottom-30"
                 placeholder="Email"
                 name="email"
                 ref={register}
                />
                <input 
                 type="password" 
                 className="form-control input-base"
                 placeholder="Senha"
                 name="password"
                 ref={register}
                />
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