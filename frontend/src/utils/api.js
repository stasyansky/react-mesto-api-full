class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  setNewToken() {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    };
  }

  _errorHandler = async (res) => {
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

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._errorHandler);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._errorHandler);
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._errorHandler);
  }

  toggleLike({ cardId, isLikedByMe }) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLikedByMe ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  cardDelete(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  avatarUpdate(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(this._errorHandler);
  }
}

const api = new Api({
  url: 'https://st.ivanisov2b.nomoredomains.sbs',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  }
});
export default api;
