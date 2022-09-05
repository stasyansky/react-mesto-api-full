const BASE_URL = 'https://st.ivanisov2b.nomoredomains.sbs';

const errorHandler = async (res) => {
    if (res.ok) {
        return res.json();
    }

    let errorText = res.status;
    const responseData = await res.json();

    if (res.status === 400) {
        errorText = responseData?.validation?.body?.message || "400 — Токен не передан или передан не в том формате";
    } else if (res.status === 401) {
        errorText = "401 — Переданный токен некорректен";
    }

    throw new Error(`Ошибка: ${responseData?.message || errorText}`);
}

export const onRegister = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
        .then(errorHandler)
};

export const onLogin = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then(errorHandler)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            } else {
                return;
            }
        })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(errorHandler)
}
