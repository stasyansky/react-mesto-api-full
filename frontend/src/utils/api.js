class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorHandler = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
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
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b1358c2e-a18d-4d01-8b45-12870e20906b',
    'Content-Type': 'application/json',
  }
});
export default api;
