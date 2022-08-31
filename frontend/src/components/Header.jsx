import React from 'react';
import logoPath from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, handleSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Логотип сайта"/>
            <Routes>
                <Route path='/signup' element={<Link to='/signin' className="header__link">Войти</Link>} />
                <Route path='/signin' element={<Link to='/signup' className="header__link">Регистрация</Link>} />
                <Route path='/' element={
                    <div className="header__user">
                        <p className="header__email">{email}</p>
                        <Link to='/signin' className="header__link" onClick={handleSignOut}>Выйти</Link>
                    </div>
                } />
            </Routes>
        </header>
    );
};

export default Header;
