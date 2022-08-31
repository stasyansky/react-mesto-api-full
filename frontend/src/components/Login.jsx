import React, { useState } from 'react';

function Login({ handleSignIn }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleSignIn({
            email,
            password,
        });
        setEmail('');
        setPassword('');
    }

    return (
        <section className="auth">
            <h2 className="auth__title">Вход</h2>
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
                    Войти
                </button>
            </form>
        </section>
    );
};

export default Login;
