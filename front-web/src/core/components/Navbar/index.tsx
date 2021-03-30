import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');

    const location = useLocation();

    //sempre que houver uma mudança de rota será verificado se o usuário tem credenciais válidas
    useEffect(() => {
       const currentUserData = getAccessTokenDecoded();
       setCurrentUser(currentUserData.user_name);
    }, [location]);

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/" className="nav-logo-text">
                    <h4>DS catalog</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact className="nav-link">
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className="nav-link">
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin" className="nav-link">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right">
                {currentUser && (
                    <>
                        {currentUser}
                        <a 
                            href="#logout" 
                            className="nav-link active d-inline"
                            onClick={handleLogout}
                        >
                            SAIR
                        </a>
                    </>
                )}
                {!currentUser && (
                <Link to="/auth/login" className="nav-link active">
                    LOGIN
                </Link>
                )}                
            </div>
        </nav>
    )
}

export default Navbar;