import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register({ handleSignUp }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleSignUp({
            email,
            password,
        });
        setEmail('');
        setPassword('');
    }
    
    return (
        <section className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="inputEmail"
                    className="auth__input"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                />
                <input
                    type="password"
                    id="password"
                    name="inputPassword"
                    className="auth__input"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                />
                <button className="auth__btn" type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <div className="auth__signup">
                <p className="auth__signup_text">Уже зарегистрированы?&nbsp;</p>
                <Link to='/signin' className="auth__signup_link">
                    Войти
                </Link>
            </div>
        </section>
    );
};

export default Register;
