class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`);
  }

  _makeRequest(url, options) {
    return fetch(url, options).then(res => 
      res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`)
    );
  }

  getInitialCards() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  addNewCard({ name, link }) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  editUserInfo({ name, about }) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  likeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  
  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._handleResponse);
  }
}


const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "437f8561-72d0-4eae-8fce-fe37093ae3b9",
    "Content-Type": "application/json",
  },
});

export default api;