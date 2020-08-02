 class API {

  constructor(dataAuthen) {
    this.dataAuthen = dataAuthen;
  }

  parsing(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  }

  getInitialCards() {
    return fetch(`${this.dataAuthen.baseURL}/cards`, {
      method: 'GET',
      headers: this.dataAuthen.headers,
    }).then((res) => this.parsing(res));
  }

  getUserData() {
    return fetch(`${this.dataAuthen.baseURL}/users/me`, {
      method: 'GET',
      headers: this.dataAuthen.headers,
    })
      .then((res) => this.parsing(res))
      /*
        Можно лучше: здесь и далее размещать блок catch который снова выбрасывает ошибку
        и больше ничего не делает необязательно
      */
      .catch((err) => Promise.reject(new Error(err)));
  }

  patchUserData(userData) {
    return fetch(`${this.dataAuthen.baseURL}/users/me`, {
      method: 'PATCH',
      headers: this.dataAuthen.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job,
      }),
    })
      .then((res) => this.parsing(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  postNewCard(cardData) {
    return fetch(`${this.dataAuthen.baseURL}/cards`, {
      method: 'POST',
      headers: this.dataAuthen.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => this.parsing(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  deleteCard(id) {
    return fetch(`${this.dataAuthen.baseURL}/cards/${id}`, {
      method: 'DELETE',
      headers: this.dataAuthen.headers,
    })
      .then((res) => this.parsing(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  likeCard(id) {
    return fetch(`${this.dataAuthen.baseURL}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.dataAuthen.headers,
    })
      .then((res) => this.parsing(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  deletelike(id) {
    return fetch(`${this.dataAuthen.baseURL}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.dataAuthen.headers,
    })
      .then((res) => this.parsing(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  patchUserAvatar(avatarLink) {
    return fetch(`${this.dataAuthen.baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.dataAuthen.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
      .then((res) => this.parsing(res))
      .catch((err) => Promise.reject(new Error(err)));
  }
}
