class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`Ошибка: ${resp.status}`);
  };
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  getCardInfo = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  editProfile = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  addNewCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  deleteCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  likeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  disLikeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  };

  apdateAvatar = (urlAvatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: urlAvatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  };
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
    'Content-type': 'application/json',
  },
});
export default api;